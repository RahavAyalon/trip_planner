from fastapi import APIRouter
from ..models.prompt import Prompt
from ..controllers.trips import plan_trip_controller

router = APIRouter(prefix="/trips", tags=["Trips"])


@router.post("", summary="Plan a trip")
async def plan_trip(prompt: Prompt):
    return plan_trip_controller(prompt.prompt)

