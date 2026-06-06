from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib

# 1. Start the API server
app = FastAPI()

# 2. Add CORS so React (running on a different port) is allowed to talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, you would put your actual website URL here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Load your trained Random Forest model
# Make sure 'insurance_model.joblib' is in the exact same folder as this server.py file!
model = joblib.load('insurance_model.joblib')

# 4. Define what the incoming JSON from React will look like
class PatientData(BaseModel):
    age: int
    bmi: float
    is_smoker: int  # 1 for Yes, 0 for No

# 5. Create the API endpoint
@app.post("/predict")
def make_prediction(data: PatientData):
    # Ask the model to predict based on the React inputs
    prediction = model.predict([[data.age, data.bmi, data.is_smoker]])
    
    # Send the answer back to React
    return {"estimated_charges": round(prediction[0], 2)}