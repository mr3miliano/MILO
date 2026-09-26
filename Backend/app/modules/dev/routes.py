from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def get_dev_root():
    return {"module": "dev", "message": "Dev API ready"}
