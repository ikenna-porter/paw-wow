from fastapi import FastAPI
from routers import profile, account, characteristics

app = FastAPI()
app.include_router(profile.router)
app.include_router(account.router)
app.include_router(characteristics.router)