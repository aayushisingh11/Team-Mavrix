from fastapi import Request, HTTPException, APIRouter # <-- Import APIRouter
from dotenv import load_dotenv
import os
import google.generativeai as genai
import json
import logging
import math 

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

# --- Configure GenAI ---

def get_model():
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        logger.error("GOOGLE_API_KEY not found in environment variables.")
        raise ValueError("GOOGLE_API_KEY not found in environment variables.")

    genai.configure(api_key=api_key)
    logger.info("GenAI configured successfully.")

    return genai.GenerativeModel("gemini-2.5-flash")

model = get_model()

# --- Initialize the Model ---
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "application/json",
}
try:
    model = genai.GenerativeModel(
      model_name="gemini-2.5-flash", 
      generation_config=generation_config,
    )
    logger.info(f"Initialized GenAI model: {model.model_name}")
except Exception as e:
    logger.error(f"Failed to initialize GenAI model: {e}")
    raise

# -----------------------------

router = APIRouter() 


@router.post("/api/generate-itinerary")
async def generate_itinerary(request: Request):
    try:
        data = await request.json()
        mood = data.get("mood")
        location = data.get("location")
        # --- Get num_days and budget ---
        num_days = data.get("num_days", 3) 
        budget = data.get("budget") 

        # --- Input Validation ---
        if not mood:
            logger.warning("Request received without 'mood'.")
            raise HTTPException(status_code=400, detail="Mood is required")
        if not location:
            logger.warning("Request received without 'location'.")
            raise HTTPException(status_code=400, detail="Location is required")
        try:
            num_days = int(num_days)
            if not 1 <= num_days <= 7: 
                 raise ValueError("Number of days must be between 1 and 7.")
        except (ValueError, TypeError):
            logger.warning(f"Invalid 'num_days' received: {data.get('num_days')}")
            raise HTTPException(status_code=400, detail="Number of days must be a valid integer between 1 and 7.")

        logger.info(f"Received request: mood='{mood}', location='{location}', num_days={num_days}, budget='{budget}'")

        # --- Calculate desired activity count ---
        min_activities = num_days * 3
        max_activities = num_days * 5
        target_activities = num_days * 4 

        # --- Construct Budget Instruction ---
        budget_instruction = ""
        if budget:
            budget_str = str(budget).lower().strip()
            if budget_str.isdigit():
                 budget_instruction = f"Keep the overall estimated cost for the {num_days}-day trip around {budget_str} INR, balancing free and paid activities."
            elif "low" in budget_str or "cheap" in budget_str or "budget" in budget_str:
                 budget_instruction = f"Focus heavily on free or very low-cost activities suitable for a tight budget over {num_days} days."
            elif "mid" in budget_str or "moderate" in budget_str:
                 budget_instruction = f"Suggest a mix of free, low-cost, and moderately priced activities for a mid-range budget over {num_days} days."
            elif "high" in budget_str or "luxury" in budget_str:
                 budget_instruction = f"Include some high-end or luxury experiences suitable for a generous budget over {num_days} days, but still mix with other options."
            else: 
                 budget_instruction = f"Consider a budget preference described as '{budget}' when suggesting activities for the {num_days}-day trip."
        else:
            budget_instruction = f"Generate a diverse range of activities for {num_days} days without strict budget constraints, including free and paid options."

        # --- Construct the prompt for Gemini ---
        prompt = f"""
        Generate a list of unique and engaging itinerary activities in {location} suitable for someone feeling '{mood}'.
        The itinerary should cover {num_days} days. Generate a total of exactly {target_activities} activities for the entire duration (roughly 3-5 activities per day).
        Distribute the activities logically across morning, afternoon, and evening slots over the {num_days} days.
        {budget_instruction}

        Return ONLY a valid JSON array of exactly {target_activities} objects. Do NOT include ```json markdown formatting or any introductory text.
        Each object in the array MUST have the following keys and value types EXACTLY:
        - "time": string (e.g., "9:00 AM", "2:00 PM", "7:00 PM", appropriate for the activity and time slot)
        - "title": string (max 60 characters)
        - "description": string (max 150 characters)
        - "duration": string (e.g., "1 hour", "2.5 hours")
        - "type": string (choose ONE from: 'wellness', 'food', 'leisure', 'adventure', 'culture', 'nature', 'local', 'mixed', 'social')
        - "price": number (estimated price in INR, considering the budget if specified, use 0 if free)
        - "location": string (specific place or area in {location})
        - "rating": number (estimated rating between 3.5 and 5.0)
        - "bookable": boolean (always set to true for this example)
        - "coordinates": array of two numbers [latitude, longitude] (estimated coordinates for the location, must be valid numbers)

        Ensure activities are varied and specific to {location}. Ensure the total number of activities in the returned JSON array is exactly {target_activities}. Assign appropriate times throughout the {num_days} days.
        """
        
        # --- Call Gemini ---
        logger.info(f"Sending prompt to Gemini requesting {target_activities} activities...")
        chat_session = model.start_chat()
        response = chat_session.send_message(prompt)
        logger.info("Received response from Gemini.")

        # --- Process the response ---
        if not response.text:
             logger.warning("Gemini returned an empty response.")
             raise HTTPException(status_code=500, detail="Gemini returned an empty response.")

        try:
             activities = json.loads(response.text)
             if not isinstance(activities, list):
                 raise ValueError("Response is not a JSON list")

             activity_count = len(activities)
             if not (min_activities <= activity_count <= max_activities):
                 logger.warning(f"Expected approx {target_activities} (min {min_activities}, max {max_activities}) activities, received {activity_count}. Proceeding anyway.")
             
             logger.info(f"Successfully parsed {activity_count} activities from Gemini response.")

        except json.JSONDecodeError:
             logger.error(f"Failed to parse Gemini response as JSON. Raw response: {response.text}")
             raise HTTPException(status_code=500, detail="Failed to parse Gemini response as JSON.")
        except ValueError as ve:
             logger.error(f"Invalid JSON structure/count received: {ve}. Raw response: {response.text}")
             raise HTTPException(status_code=500, detail=f"Invalid JSON structure/count received: {ve}")

        return activities

    except HTTPException as http_exc:
        logger.error(f"HTTP Exception: {http_exc.status_code} - {http_exc.detail}")
        raise http_exc
    except Exception as e:
        logger.exception(f"An unexpected error occurred: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")