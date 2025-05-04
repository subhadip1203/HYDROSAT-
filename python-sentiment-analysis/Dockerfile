FROM python:3.13-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir  pika python-dotenv torch transformers requests


# Copy app source code
COPY . .


# wait 15 seconds and Start the Python app
CMD ["sh", "-c", "sleep 15 && python run.py"]
