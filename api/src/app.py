from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

# TODO remove first api... in all imports in the code
from api.src.routes.api import api_router

origins = [
    "http://localhost",
    "http://localhost:3000",
]


app: FastAPI = FastAPI(
    title="Dofinity's AI project",  # TODO
    description="",  # TODO
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


