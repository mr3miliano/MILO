from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def get_business_root():
    return {"module": "business", "message": "Business API ready"}
