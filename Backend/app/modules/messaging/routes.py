from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def get_messaging_root():
    return {"module": "messaging", "message": "Messaging API ready"}
