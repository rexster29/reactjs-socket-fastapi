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
    allow_origins=["*"],  # can alter with time
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def process_large_stream(data):
    """
    Processes a large stream of data, identifying text and table content
    and emitting appropriate JSON events.
    """
    in_table = False  # To track whether we are inside a table block
    buffer = ""  # To accumulate content between chunks

    for line in data.splitlines():  # Simulate streaming line by line
        if line.strip() == "'''table":  # Start of a table
            if buffer.strip():
                yield {"type": "text", "data": buffer.strip()}
                buffer = ""
            in_table = True
            continue

        if line.strip() == "'''":  # End of a table
            if in_table:
                try:
                    html_table_content = parse_table(buffer.strip())
                    yield {"type": "table", "data": html_table_content}
                except Exception as e:
                    yield {"type": "error", "data": str(e)}
                buffer = ""
                in_table = False
            continue

        # Accumulate content
        buffer += line + "\n"

    # Emit any remaining text at the end
    if buffer.strip():
        yield {"type": "text", "data": buffer.strip()}


def parse_table(table_content):
    """
    Parses a table-like JSON block from a string and returns HTML content.
    """
    try:
        # Parse the table content into a Python object
        table_data = json.loads(table_content)
        
        # Start building the HTML table
        html = "<table border='1'>"
        
        # Add headers
        html += "<tr>"
        for header in table_data['headers']:
            html += f"<th>{header}</th>"
        html += "</tr>"

        # Add rows
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

    # Processing the stream and sending events over WebSocket
    for event in process_large_stream(testData):
        await websocket.send_json(event)
        print(event)
        await asyncio.sleep(8)  # Simulate some delay for streaming
    
    await websocket.close()