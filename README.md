
  # Mavrix dashboard
  ## Running the code

  Run `npm i` to install the dependencies. (Make sure you are in Component folder in src)

  Run `npm run dev` to start the development server.

  ## Running backend (using seprate terminal)
  Run `pip install` to install the dependencies. (Make sure you are in Backend folder in terminal)

  or `Run pip install fastapi uvicorn google-genai python-dotenv google-generativeai` to install the dependencies. (Make sure you are in Backend folder in terminal)
  
  Run `uvicorn main:app --reload --host 127.0.0.1 --port 8000` to start backend server.
  
  Check port `http://127.0.0.1:8000/` for `{"message":"FastAPI backend is running"}` to confirm server is running.
  
  Run `uvicorn main:app --reload` for reload or refresh if required.

  Note: .env file is not there. You have to add inside Backend folder with API key `GOOGLE_API_KEY=YOUR_VALID_API_KEY_HERE`

### You can Visit the webapp at

  [click to view](https://team-mavrix-deploy-final.vercel.app/)

  You can use email - test@test.com
  
  And Pass as - 123
  
