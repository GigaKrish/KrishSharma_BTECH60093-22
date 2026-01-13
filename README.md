# TaskFlow - Kanban Task Management System

**Student Name:** Krish Sharma  
**Roll No:** BTECH/60093/22

## Demo Video
> **[View Video](https://drive.google.com/file/d/1E5KqJGVb7Lc6-zT0ZSkbU7yjaYDUrQRP/view?usp=drivesdk)**
This video demonstrates Kanban deployment, which features to update task, save login /signup info and route task data to specific account along with various other functionality. 

## Project Overview
TaskFlow is a robust, full-stack Kanban application designed to help users organize tasks efficiently. It features a modern, dark-themed drag-and-drop interface backed by a secure, high-performance API.

Users can create accounts, log in securely, and manage tasks across three stages: To Do, In Progress, and Completed. The application ensures data persistence using a SQL database and protects user data with JWT authentication.

## Tech Stack
* **Backend:** FastAPI (Python)
* **Frontend:** React 19 + Vite
* **Database:** SQLite (Default) / SQLAlchemy ORM
* **Authentication:** OAuth2 with Password Flow (JWT) & BCrypt
* **Styling:** Tailwind CSS (Modern Dark UI)

## Setup & Installation

### 1. Prerequisites
Ensure you have **Python 3.9+**, **Node.js 16+**, and **Git** installed on your machine.

### 2. Clone the Repository
```bash
git clone [https://github.com/your-username/taskflow.git](https://github.com/your-username/taskflow.git)
cd taskflow
```

### 3. Backend Setup
The backend runs on port `8000`.

Navigate to the backend folder:
```bash
cd backend
```

Create and Activate Virtual Environment:
* **Windows:**
```bash
python -m venv .venv
.venv\Scripts\activate
```
* **Mac/Linux:**
```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install Dependencies:
```bash
pip install fastapi uvicorn sqlalchemy pymysql python-dotenv passlib[bcrypt] python-jose[cryptography] python-multipart
```

Configuration:
Ensure a `.env` file exists in the `backend/` directory:
```ini
DATABASE_URL=sqlite:///./kanban.db
SECRET_KEY=super_secret_key_change_me
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

Start the Server:
```bash
python -m uvicorn app.main:app --reload
```
The API will start at `http://127.0.0.1:8000`.

### 4. Frontend Setup
The frontend runs on port `5173`. Open a **new terminal** window for this.

Navigate to the frontend folder:
```bash
cd frontend
```

Install Dependencies:
```bash
npm install
```

Start the Development Server:
```bash
npm run dev
```

Access the App:
Open your browser and visit: **http://localhost:5173**

**Project Structure**
```plaintext
taskflow/
├── backend/            # FastAPI Backend
│   ├── app/            # Application logic
│   ├── .env            # Environment config
│   └── requirements.txt
├── frontend/           # React Frontend
│   ├── src/            # Components & Pages
│   └── package.json    # Dependencies
└── README.md           # This file
```

**Troubleshooting & Common Issues**

Backend: "500 Internal Server Error" on Login
* **Cause:** The application cannot read the `SECRET_KEY` from your `.env` file.
* **Fix:** Ensure you are running the `python -m uvicorn` command from *inside* the `backend` folder.

Backend: "ModuleNotFoundError: No module named 'sqlalchemy'"
* **Cause:** Virtual environment not activated.
* **Fix:** Activate your venv (`.venv\Scripts\activate`) and run `pip install -r requirements.txt`.

Frontend: "vite is not recognized"
* **Cause:** Node modules are missing.
* **Fix:** Run `npm install` inside the `frontend` folder before running `npm run dev`.

**Documentation**
* **API Docs:** http://127.0.0.1:8000/docs
* **Backend Details:** See `backend/README.md`
* **Frontend Details:** See `frontend/README.md`