from fastapi import FastAPI
from routers import messages, conversations


app = FastAPI()
app.include_router(messages.router)
app.include_router(conversations.router)
