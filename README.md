# ReactJS Socket FastAPI Project

A modern web application built with ReactJS for the frontend and FastAPI for the backend, featuring real-time communication capabilities.

## Tech Stack

### Backend
- FastAPI (Python 3.7+)
- Uvicorn ASGI Server
- Gunicorn

### Frontend
- React 18
- Vite
- Framer Motion
- Modern JavaScript (ES6+)

## Setup and Run Locally

### Backend Server Setup

The backend is built with FastAPI, a modern, high-performance web framework for building APIs with Python 3.7+.

1. Navigate to the server directory:
```bash
cd serverFastAPI
```

2. Install the dependencies:
```bash
pip install -r requirements.txt
```

3. Run the backend server:
```bash
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The server will be available at `http://localhost:8000`

### Frontend Client Setup

The frontend is built with React and uses Vite as the build tool.

1. Navigate to the client directory:
```bash
cd client
```

2. Install the dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The client will be available at `http://localhost:5173`

## Project Structure

- `/serverFastAPI` - Backend FastAPI server
- `/client` - Frontend React application

## Features

- Modern React frontend with Vite build tool
- Fast and efficient FastAPI backend
- Real-time communication capabilities
- Development and production configurations
