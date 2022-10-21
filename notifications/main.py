from fastapi import FastAPI, WebSocket
from typing import List
import asyncio
import time

app = FastAPI()

@app.websocket("/api/notifications")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        #data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: hiiiiiiiiii")

def create_friend_notification():
    pass