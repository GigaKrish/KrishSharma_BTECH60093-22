# Frontend - Kanban Task Management System

**Student Name:** Krish Sharma \
**Roll No:** BTECH/60093/22\
**Framework:** React + Vite

## Project Overview
The frontend interface for the Kanban Task Management System. It provides a responsive, drag-and-drop interface for managing tasks across different statuses (Pending, In Progress, Completed). It communicates with the FastAPI backend via REST APIs to ensure data persistence.

## Tech Stack
* **Core:** React.js (Vite)
* **Styling:** Tailwind CSS (v3.4.17)
* **State Management:** React Context API (AuthContext)
* **Routing:** React Router DOM
* **Drag & Drop:** @hello-pangea/dnd
* **HTTP Client:** Axios
* **Icons:** Lucide React
* **Date Formatting:** Date-fns

## Setup & Installation

### 1. Prerequisites
Ensure you have **Node.js** installed on your machine.

### 2. Installation
Navigate to the frontend directory and install dependencies.

```bash
cd frontend
npm install
```
**Important Note on Tailwind CSS:** This project relies on **Tailwind CSS v3**. To ensure compatibility with the current configuration files and avoid version conflicts (specifically with v4), use the following command if re-installing dependencies:

```Bash
npm install tailwindcss@3.4.17 postcss autoprefixer
````
3. Environment Configuration
By default, the application connects to the backend at `http://localhost:8000`. To modify the backend URL, update the baseURL property in: src/services/api.js

Running the Application
To start the development server:

```Bash
npm run dev
```
The application will be available at: http://localhost:5173

**Project Structure**
```Plaintext
frontend/
├── src/
│   ├── components/      # Reusable UI components (TaskCard, Board Column)
│   ├── context/         # Global state management (Authentication)
│   ├── pages/           # Main Application Pages (Login, Register, Dashboard)
│   ├── services/        # API configurations (Axios instance)
│   ├── App.jsx          # Main App Component & Routing configuration
│   └── main.jsx         # Entry point
├── tailwind.config.js   # Tailwind CSS Configuration
└── package.json         # Project dependencies and scripts
```
**Development Notes**

Initialization
This project was initialized using Vite with the following command:
```Bash
npm create vite@latest frontend -- --template react
```
Key Libraries
The following command was used to install the core functionality packages:

```Bash
npm install axios react-router-dom @hello-pangea/dnd lucide-react date-fns tailwindcss postcss autoprefixer
```