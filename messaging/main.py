from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from routers import messages, conversations, user_vo

app = FastAPI()

app.include_router(messages.router)
app.include_router(conversations.router)
app.include_router(user_vo.router)

origins = [
    "http://localhost:3000",
    "http://localhost:8100",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)