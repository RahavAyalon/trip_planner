from fastapi import APIRouter

from ..routes import ping, trips

api_router = APIRouter()

api_router.include_router(ping.router)
api_router.include_router(trips.router)
