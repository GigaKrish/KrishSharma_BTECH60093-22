#TaskFlow Backend API

The RESTful API service for the TaskFlow Kanban application. Built with FastAPI, it handles user authentication, task management, and database interactions with high performance and type safety.

##Tech Stack
**Framework:** FastAPI
**Database ORM:** SQLAlchemy
**Data Validation:** Pydantic
**Authentication:** OAuth2 with Password Flow (JWT)
**Server:** Uvicorn (ASGI)

##Quick Start
1. Prerequisites
Python 3.9 or higher
pip (Python Package Manager)
2. Installation
Navigate to the backend directory and set up your virtual environment to isolate dependencies.

Create a virtual environment
```bash
python -m venv .venv
```
Activate the virtual environment
Windows:
```bash
.venv\Scripts\activate
```
Mac/Linux:
```bash
source .venv/bin/activate
``
Install required dependencies
```bash
pip install fastapi uvicorn sqlalchemy pymysql python-dotenv passlib[bcrypt] python-jose[cryptography] python-multipart
```
3. Configuration (.env)
Create a .env file in the backend/ root directory to configure your database and security settings.

File: backend/.env
```bash
# Database Connection (Default: SQLite)
DATABASE_URL=sqlite:///./kanban.db

# Security Secrets (Change these for production!)
SECRET_KEY=your_super_secret_random_string
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```
Running the Server
To start the API server in development mode (with auto-reload):
```bash
python -m uvicorn app.main:app --reload
```
API Root: http://127.0.0.1:8000
Interactive Docs (Swagger UI): https://www.google.com/search?q=http://127.0.0.1:8000/docs
Alternative Docs (ReDoc): https://www.google.com/search?q=http://127.0.0.1:8000/redoc
API Endpoints
The API is structured around Authentication and Task resources.

Authentication (/auth)
POST /auth/signup: Create a new user account.
POST /auth/login/json: Authenticate via email/password and receive a JWT Bearer token.
GET /auth/me: Retrieve the currently authenticated user's profile.
Tasks (/tasks)
GET /tasks/: Fetch all tasks belonging to the current user (supports filtering).
POST /tasks/: Create a new task.
GET /tasks/{task_id}: Get details of a specific task.
PUT /tasks/{task_id}: Update a task (e.g., move status from pending to completed).
DELETE /tasks/{task_id}: Permanently remove a task.
Project Structure
```Plaintext
backend/
├── app/
│   ├── __init__.py
│   ├── main.py          # Application entry point & routes
│   ├── models/          # SQLAlchemy Database Models
│   ├── schemas/         # Pydantic Data Schemas
│   ├── db/              # Database connection logic
│   └── routers/         # Route splitting
├── .env                 # Environment variables (GitIgnored)
└── requirements.txt     # Python dependencies
```