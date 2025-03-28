
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Train the model during build
RUN python -c "from model import train_model; train_model('property_model.joblib')"

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
