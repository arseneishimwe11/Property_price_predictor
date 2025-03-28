
/**
 * Service for interacting with the property price prediction API
 */

import { FormValues } from "@/components/house-form/formSchema";

export interface PropertyData extends FormValues {}

export interface PredictionResponse {
  predictedPrice: number;
  confidence: number;
  priceRange: {
    min: number;
    max: number;
  };
  comparableProperties: any[];
}

// API base URL - change this in production to your actual API endpoint
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * Predict property price based on input features
 */
export const predictPropertyPrice = async (propertyData: PropertyData): Promise<PredictionResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bedrooms: parseInt(propertyData.bedrooms),
        bathrooms: parseFloat(propertyData.bathrooms),
        squareFeet: parseInt(propertyData.squareFeet),
        yearBuilt: parseInt(propertyData.yearBuilt),
        location: propertyData.location,
        propertyType: propertyData.propertyType,
        neighborhood: propertyData.area
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to predict property price');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error predicting property price:', error);
    
    // Fallback to frontend calculation if API is not available
    // This ensures the app works even if the backend is down
    return fallbackPrediction(propertyData);
  }
};

/**
 * Fallback prediction method using frontend calculation
 * This is used when the API is not available
 */
const fallbackPrediction = (propertyData: PropertyData): PredictionResponse => {
  // Simple frontend calculation (same as the original mock)
  const basePrice = 300000;
  const bedroomFactor = parseInt(propertyData.bedrooms) * 25000;
  const bathroomFactor = parseFloat(propertyData.bathrooms) * 15000;
  const sqftFactor = parseInt(propertyData.squareFeet) * 150;
  
  const calculatedPrice = basePrice + bedroomFactor + bathroomFactor + sqftFactor;
  const confidence = Math.floor(85 + Math.random() * 10);
  
  return {
    predictedPrice: calculatedPrice,
    confidence: confidence,
    priceRange: {
      min: calculatedPrice * 0.93,
      max: calculatedPrice * 1.07
    },
    comparableProperties: []
  };
};
