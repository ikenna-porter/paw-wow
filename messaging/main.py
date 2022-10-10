from fastapi import FastAPI
from routers import messaging


app = FastAPI()
app.include_router(messages.router)
