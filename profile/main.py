from fastapi import FastAPI
from routers import profile, accounts 
from authenticator import authenticator

app = FastAPI()
app.include_router(profile.router)
app.include_router(accounts.router)
app.include_router(authenticator.router)
