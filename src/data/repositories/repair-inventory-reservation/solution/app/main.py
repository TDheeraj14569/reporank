from fastapi import FastAPI
from app.routes import inventory

app = FastAPI()
app.include_router(inventory.router)
