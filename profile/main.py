from fastapi import FastAPI
from routers import profile, account, vaccination

app = FastAPI()
app.include_router(profile.router)
app.include_router(account.router)
app.include_router(vaccination.router)