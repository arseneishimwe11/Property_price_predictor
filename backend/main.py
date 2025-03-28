
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import joblib
import os
import numpy as np
from model import train_model, predict_price

# Initializing FastAPI app
app = FastAPI(
    title="Property Price Prediction API",
    description="API for predicting property prices based on features",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PropertyFeatures(BaseModel):
    bedrooms: int
    bathrooms: float
    squareFeet: int
    yearBuilt: int
    propertyType: str
    location: str
    neighborhood: str = None

class PredictionResponse(BaseModel):
    predictedPrice: float
    confidence: float
    priceRange: dict
    comparableProperties: list = []

model_path = "property_model.joblib"
if not os.path.exists(model_path):
    print("Training new model...")
    train_model(model_path)
    print("Model trained and saved.")

model = joblib.load(model_path)

@app.get("/")
def read_root():
    return {"message": "Property Price Prediction API is running"}

@app.post("/predict", response_model=PredictionResponse)
def predict_property_price(property_data: PropertyFeatures):
    try:
        # Process the input data
        price, confidence = predict_price(
            model,
            property_data.bedrooms,
            property_data.bathrooms,
            property_data.squareFeet,
            property_data.yearBuilt,
            property_data.propertyType,
            property_data.location
        )
        
        # Create a price range (±7%)
        lower_bound = price * 0.93
        upper_bound = price * 1.07
        
        # Return prediction and metadata
        return {
            "predictedPrice": price,
            "confidence": confidence,
            "priceRange": {
                "min": lower_bound,
                "max": upper_bound
            },
            "comparableProperties": []
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
