from fastapi import FastAPI, APIRouter, WebSocket, WebSocketDisconnect, Depends
from routers import (
    profiles, 
    accounts, 
    vaccination_records, 
    characteristics, 
    friendships, 
    profile_pic,
    messages,
    conversations,
    otherprofile
)
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import json
from datetime import datetime, timezone
from routers.messages import MessageIn, MessageRepository

router = APIRouter()

app = FastAPI()
app.include_router(profiles.router)
app.include_router(accounts.router)
app.include_router(authenticator.router)
app.include_router(vaccination_records.router)
app.include_router(characteristics.router)
app.include_router(friendships.router)
app.include_router(profile_pic.router)
app.include_router(messages.router)
app.include_router(conversations.router)
app.include_router(otherprofile.router)

origins = ['*']    

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def timestamp():
    return datetime.now(timezone.utc).isoformat()


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.current_message_id = 0

    async def connect(
        self,
        websocket: WebSocket,
        conversation_id: int,
    ):
        await websocket.accept()
        self.active_connections.append(websocket)

    #     await self.send_personal_message(
    #         "Welcome!",
    #         conversation_id,
    #         websocket,
    #     )

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    # async def send_personal_message(
    #     self,
    #     message: str,
    #     conversation_id: int,
    #     websocket: WebSocket,
    # ):
    #     payload = json.dumps({
    #         "conversation_id": conversation_id,
    #         "content": message,
    #         "timestamp": timestamp(),
    #         #message id:
    #         "message_id": self.next_message_id(), 
    #     })
    #     await websocket.send_text(payload)

    async def broadcast(self, message: str, conversation_id: int):
        payload = json.dumps({
            "conversation_id": conversation_id,
            "content": message,
            "timestamp": timestamp(),
            "message_id": self.next_message_id(),
        })
        print('active connections:', len(self.active_connections))
        for connection in self.active_connections:
            await connection.send_text(payload)

    def next_message_id(self):
        self.current_message_id += 1
        return self.current_message_id


manager = ConnectionManager()
@router.websocket("/ws/conversations/{conversation_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    conversation_id: int,
    repo: MessageRepository = Depends()
):
    await manager.connect(websocket, conversation_id)
    try:
        while True:
            message = await websocket.receive_text()
            await manager.broadcast(message, conversation_id)

            #save message into DB with corresponding conversation_id
            message_dict = json.loads(message)
            stored_message = MessageIn (
                sender = message_dict["sender"],
                recipient = message_dict["recipient"],
                timestamp = message_dict["timestamp"],
                content = message_dict["content"],
                conversation_id = message_dict["conversation_id"]
            )
            repo.create(stored_message)

    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast("Disconnected", conversation_id)


app.include_router(router)