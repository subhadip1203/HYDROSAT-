import pika
import json
import os
from dotenv import load_dotenv
from transformers import pipeline
import requests

# Load environment variables from .env file
load_dotenv()

# Get RabbitMQ connection URL and other configurations from environment variables
RABBITMQ_URL = str(os.getenv('RABBIT_MQ_URI', ''))
MAIN_APP_URL = str(os.getenv('MAIN_APP_URL', ''))
API_KEY = str(os.getenv('INTERNAL_COMUNICATION_API_KEY', ''))

# Define the Incoming queue and exchange names
INCOMING_QUEUE_NAME = 'feedback-to-python-queue'
INCOMING_EXCHANGE = 'feedback-to-python-exchange'
INCOMING_ROUTING_KEY = 'feedback-to-python-key'

# Load BERT Tiny finetuned for sentiment analysis
classifier = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")


def map_to_simple_sentiment(text):
    """
    Maps BERT output to Good / Bad / Neutral.
    """
    result = classifier(text)[0]
    label = result['label']
    score = result['score']
    
    # Threshold: below 0.6 confidence = Neutral
    if score < 0.6:
        return "Neutral"
    elif label == 'POSITIVE':
        return "Good"
    elif label == 'NEGATIVE':
        return "Bad"
    else:
        return "Neutral"

def send_post_request(data):
    url = MAIN_APP_URL+'/api/internal/sentiment'
    headers = {
        'Authorization': 'Bearer ' + API_KEY,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    print(headers)

    try:
        response = requests.patch(url, json=data, headers=headers)
        response.raise_for_status()  # Raises HTTPError for bad responses (4xx or 5xx)
        return "success"
    except requests.exceptions.RequestException as e:
        print(f"Request failed: {e}")
        return "failed"





def callback(ch, method, properties, body):
    try:
        message = json.loads(body)
        sentiment_value = map_to_simple_sentiment(message['text'])
        payload = {
            'id': message['id'],
            'sentiment': sentiment_value
        }
        status = send_post_request(payload)
        print(f"Received message: ID={message['id']}, Text={message['text']} , Sentiment={sentiment_value}, API Status={status}")
    except Exception as e:
        print(f"Failed to process message: {body}. Error: {e}")



def main():
    # Use URLParameters instead of host
    params = pika.URLParameters(RABBITMQ_URL)
    connection = pika.BlockingConnection(params)
    channel = connection.channel()

    # Declare the same queue and durable as in Node.js
    channel.exchange_declare(exchange=INCOMING_EXCHANGE, exchange_type='direct', durable=True)
    channel.queue_declare(queue=INCOMING_QUEUE_NAME, durable=True)
    channel.queue_bind(queue=INCOMING_QUEUE_NAME, exchange=INCOMING_EXCHANGE, routing_key=INCOMING_ROUTING_KEY)

    print("Waiting for messages. To exit press CTRL+C")

    channel.basic_consume(queue=INCOMING_QUEUE_NAME, on_message_callback=callback, auto_ack=True)

    try:
        channel.start_consuming()
    except KeyboardInterrupt:
        channel.stop_consuming()
    finally:
        connection.close()

if __name__ == "__main__":
    main()
