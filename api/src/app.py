from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

# TODO remove first api... in all imports in the code
from src.routes.api import api_router


origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://16.171.215.85:3000"
]


app: FastAPI = FastAPI(
    title="Trip Planner API",
    description="",
    openapi_url=f"/api/openapi.json",
    version="0.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=os.environ["API_PREFIX"])


