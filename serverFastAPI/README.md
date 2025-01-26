# FastAPI Backend Server

This is the backend server component of the ReactJS Socket FastAPI project, built using FastAPI framework.

## Requirements

- Python 3.7+
- FastAPI
- Uvicorn
- Gunicorn

## Installation

1. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Dependencies

The main dependencies are:
- `fastapi[all]==0.70.1` - The FastAPI framework with all optional dependencies
- `uvicorn[standard]==0.15.0` - ASGI server implementation
- `gunicorn==20.1.0` - Python WSGI HTTP Server for UNIX

## Development Server

Run the development server with:
```bash
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

- `--reload`: Enable auto-reload on code changes
- `--host 0.0.0.0`: Make server accessible from external network
- `--port 8000`: Run server on port 8000

## API Documentation

Once the server is running, you can access:
- API documentation at `http://localhost:8000/docs`
- Alternative API documentation at `http://localhost:8000/redoc`
