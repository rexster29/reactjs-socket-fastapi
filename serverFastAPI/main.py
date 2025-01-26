from typing import List
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import json
from data import large_stream_data as testData
import asyncio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def process_large_stream(data):
    in_table = False
    buffer = ""

    for line in data.splitlines():
        if line.strip() == "'''table":
            if buffer.strip():
                yield {"type": "text", "data": buffer.strip()}
                buffer = ""
            in_table = True
            continue

        if line.strip() == "'''":
            if in_table:
                try:
                    html_table_content = parse_table(buffer.strip())
                    yield {"type": "table", "data": html_table_content}
                except Exception as e:
                    yield {"type": "error", "data": str(e)}
                buffer = ""
                in_table = False
            continue

        buffer += line + "\n"

    if buffer.strip():
        yield {"type": "text", "data": buffer.strip()}

def parse_table(table_content):
    try:
        table_data = json.loads(table_content)
        html = "<table border='1'>"
        
        html += "<tr>"
        for header in table_data['headers']:
            html += f"<th>{header}</th>"
        html += "</tr>"

        for message in table_data['messages']:
            html += "<tr>"
            for header in table_data['headers']:
                html += f"<td>{message[header]}</td>"
            html += "</tr>"

        html += "</table>"
        return html
    
    except json.JSONDecodeError:
        raise ValueError(f"Invalid JSON table format: {table_content}")

@app.get("/")
async def get():
    return "Welcome Home"

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    for event in process_large_stream(testData):
        await websocket.send_json(event)
        print(event)
        await asyncio.sleep(8)
    
    await websocket.close()