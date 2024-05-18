from fastapi import APIRouter, HTTPException
import json

from ..controllers.trips import plan_trip_controller
from ..models.prompt import Prompt
from ..utils.logger import logger

router = APIRouter(prefix="/trips", tags=["Trips"])


@router.post("", summary="Plan a trip", status_code=200)
async def plan_trip(prompt: Prompt):
    logger.info(prompt.prompt)
    res = plan_trip_controller(prompt.prompt)
    if res.get("status_code") == 403:
        raise HTTPException(403, res.get("error"))
    return res


@router.get("/history", summary="Get 5 most recent trips", status_code=200)
async def get_recent_trips():
    data = []
    with open('chat_history.json', 'r') as file:
        data = json.load(file)
    return data

