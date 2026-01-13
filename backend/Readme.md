# Backend - Kanban Task Management System

**Student Name:** Krish Sharma  
**Roll No:** BTECH/60093/22  
**Framework:** FastAPI

## Project Overview

The RESTful API service for the Kanban Task Management System. It handles user authentication, task management, and database interactions with high performance and type safety using FastAPI and SQLAlchemy.

## Tech Stack

  * **Core:** FastAPI
  * **Database ORM:** SQLAlchemy
  * **Data Validation:** Pydantic
  * **Authentication:** OAuth2 with Password Flow (JWT)
  * **Server:** Uvicorn (ASGI)

## Setup & Installation

### 1. Prerequisites

Ensure you have **Python 3.9** or higher and **pip** installed on your machine.

### 2. Installation

Navigate to the backend directory and set up your virtual environment to isolate dependencies.

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment:
 * Windows: .venv\Scripts\activate
 * Mac/Linux: source .venv/bin/activate
Install required dependencies:
pip install fastapi uvicorn sqlalchemy pymysql python-dotenv passlib[bcrypt] python-jose[cryptography] python-multipart

3. Environment Configuration
Create a .env file in the backend/ root directory to configure your database and security settings.
File: backend/.env
# Database Connection (Default: SQLite)
DATABASE_URL=sqlite:///./kanban.db

# Security Secrets (Change these for production!)
SECRET_KEY=your_super_secret_random_string
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

Running the Application
To start the development server with auto-reload:
python -m uvicorn app.main:app --reload

The API will be available at: http://127.0.0.1:8000

Project Structure
```plaintext
backend/
├── app/
│   ├── core/            # Configuration & Security (config.py, security.py)
│   ├── db/              # Database connection logic (database.py)
│   ├── models/          # SQLAlchemy Database Models (models.py)
│   ├── schemas/         # Pydantic Data Schemas (schemas.py)
│   ├── main.py          # Application entry point & routes
│   └── __init__.py
├── .env                 # Environment variables (GitIgnored)
└── requirements.txt     # Python dependencies
```
Development Notes
API Documentation
Once the server is running, you can access the interactive API documentation at:
 * Swagger UI: http://127.0.0.1:8000/docs
 * ReDoc: http://127.0.0.1:8000/redoc
Key Endpoints
 * Auth: /auth/signup, /auth/login/json, /auth/me
 * Tasks: /tasks/ (GET, POST), /tasks/{id} (PUT, DELETE)

