from fastapi import FastAPI
from routers import profile, accounts, vaccination_records
from authenticator import authenticator

app = FastAPI()
app.include_router(profile.router)
app.include_router(accounts.router)
app.include_router(authenticator.router)
app.include_router(vaccination_records.router)
