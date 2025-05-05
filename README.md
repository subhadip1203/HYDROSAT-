## HYDROSAT TAKE-HOME ASSESSMENT DOCUMENTATION

## 📖 PROJECT OVERVIEW

This project is a full-stack application for collecting customer feedback and analyzing sentiment. It includes:

- A React frontend  
- A Node.js backend  
- A Python sentiment analysis service  
- RabbitMQ for message passing  
- MongoDB for data storage

---

## ✨ FEATURES

- Customer feedback submission form  
- Sentiment analysis using a BERT model  
- Admin dashboard to view feedback and sentiment results  
- Asynchronous processing using a message queue

---

## 🚀 SETUP INSTRUCTIONS

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Create a `.env` file**  
   Include the required environment variables. <br>
   I sent an Email stating the .env file content. <br>
   Keep the .env file in root of teh filde (same lavel as docker-compose.yml)


3. **Run Docker Compose**

   For Build and run:
   ```bash
   docker-compose up --build
   ```

   For running as demon mode:
   ```bash
   docker-compose up -d
   ```

4. **Access the services**
   - Frontend: http://localhost  
   - RabbitMQ Admin: http://localhost/rabbit-admin

---

## 🏗️ MAIN COMPONENTS

### 1. Frontend (React / Vite)
- Customer feedback form  
- Admin dashboard  
- Admin authentication

### 2. Backend (Node.js / Express)
- REST API endpoints  
- MongoDB integration  
- RabbitMQ publisher

### 3. Sentiment Analysis Service (Python)
- BERT-based sentiment classifier  
- RabbitMQ consumer  
- Text processing pipeline

### 4. Infrastructure
- MongoDB database  
- RabbitMQ message broker  
- Nginx web server (optional, through Docker setup)

---

## 📡 API ENDPOINTS

| Method | Endpoint                   | Description                     |
|--------|----------------------------|---------------------------------|
| POST   | /api/feedback              | Submit customer feedback        |
| POST   | /api/admin/auth/login      | Admin login                    |
| GET    | /api/admin/feedbacks       | Get all feedback (admin only)  |
| PATCH  | /api/internal/sentiment    | Update sentiment (internal)    |

---

## ⚙️ ENVIRONMENT VARIABLES

- `MONGO_URI` — MongoDB connection string  
- `RABBIT_MQ_URI` — RabbitMQ connection string  
- `MAIN_APP_URL` — Backend base URL  
- `INTERNAL_COMUNICATION_API_KEY` — Internal API key  
- `JWT_SECRET_KEY` — JWT auth secret

---


## 🛠 LOCAL DEVELOPMENT

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd node-express-backend
npm install
npm run dev

# Python Sentiment Service
cd python-sentiment-analysis
pip install -r requirements.txt
python run.py
```

---

## 💻 TECHNOLOGIES

- Frontend: React, Vite, Bootstrap  
- Backend: Node.js, Express, MongoDB  
- Services: Python, BERT, RabbitMQ  
- DevOps: Docker, Docker Compose, Nginx

---

