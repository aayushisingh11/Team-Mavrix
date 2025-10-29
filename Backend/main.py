# from fastapi import FastAPI, Request
# from fastapi.middleware.cors import CORSMiddleware
# from dotenv import load_dotenv
# import os
# from google import genai

# load_dotenv()

# # Initialize the Gemini client with API key
# client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

# app = FastAPI()

# # Allow React frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.get("/")
# async def root():
#     return {"message": "FastAPI backend is running"}

# @app.post("/api/generate")
# async def generate_text(request: Request):
#     try:
#         data = await request.json()
#         prompt = data.get("prompt", "")
#         if not prompt:
#             return {"response": "No prompt provided"}

#         # Use new Client() style
#         response = client.models.generate_content(
#             model="gemini-2.5-flash",
#             contents=prompt
#         )

#         return {"response": response.text}

#     except Exception as e:
#         return {"error": str(e)}from fastapi import FastAPI, Request

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import google.generativeai as genai
from itinerary import router as itinerary_router  # <-- 1. Import the router

load_dotenv()

# --- Configure GenAI ---
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY not found in environment variables.")
genai.configure(api_key=api_key)

# Initialize the model
model = genai.GenerativeModel("gemini-2.5-flash")

app = FastAPI()

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 2. Include the router from itinerary.py ---
app.include_router(itinerary_router)
# ---------------------------------------------

@app.get("/")
async def root():
    return {"message": "FastAPI backend is running"}

@app.post("/api/generate")
async def generate_text(request: Request):
    try:
        data = await request.json()
        prompt = data.get("prompt", "")
        if not prompt:
            return {"response": "No prompt provided"}

        response = model.generate_content(prompt)
        return {"response": response.text}

    except Exception as e:
        return {"error": str(e)}