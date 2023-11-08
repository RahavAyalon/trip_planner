from fastapi import APIRouter

router = APIRouter(prefix="/ping", tags=["Ping"])


@router.get("", summary="Test that our application is Alive!")
async def ping():
    return "pong"
