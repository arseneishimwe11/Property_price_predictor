
# Property Price Prediction API

This is a FastAPI backend service that provides property price predictions using a machine learning model.

## Getting Started

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. Install dependencies:
```
pip install -r requirements.txt
```

2. Start the server:
```
uvicorn main:app --reload
```

The server will start on `http://localhost:8000`

### API Documentation

Once the server is running, you can access the interactive API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Docker

To run the API in a Docker container:

```
docker build -t property-prediction-api .
docker run -p 8000:8000 property-prediction-api
```

## API Endpoints

- `GET /`: Health check endpoint
- `POST /predict`: Predict property price based on input features
