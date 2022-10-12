from fastapi import FastAPI
from routers import profiles, accounts, vaccination_records, characteristics
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(profiles.router)
app.include_router(accounts.router)
app.include_router(authenticator.router)
app.include_router(vaccination_records.router)
app.include_router(characteristics.router)

origins = ['*']    

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    # allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
