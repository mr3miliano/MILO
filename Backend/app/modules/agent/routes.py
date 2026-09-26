from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def get_agent_root():
    return {"module": "agent", "message": "Agent API ready"}
