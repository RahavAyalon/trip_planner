from fastapi import APIRouter
from ..models.prompt import Prompt
from ..controllers.trips import plan_trip_controller
import json
from src.utils.logger import logger
router = APIRouter(prefix="/trips", tags=["Trips"])


@router.post("", summary="Plan a trip")
async def plan_trip(prompt: Prompt):
    logger.info(prompt.prompt)
    return plan_trip_controller(prompt.prompt)


@router.get("/history", summary="Plan a trip")
async def plan_trip():
    data = []
    # todo should initialize json each time server starts/closes
    with open('chat_history.json', 'r') as file:
        data = json.load(file)
    return data

