import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.core.config import settings

router = APIRouter()

class ChatMessageRequest(BaseModel):
    message: str
    team_id: str
    user_id: str
    channel: str = "web"

@router.post("/chat")
async def chat_with_milo(payload: ChatMessageRequest):
    # Call n8n Master Ingestion Webhook
    n8n_webhook_url = f"{settings.N8N_BASE_URL.rstrip('/')}/webhook/v1/milo/ingest"
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                n8n_webhook_url,
                json={
                    "message": payload.message,
                    "teamId": payload.team_id,
                    "userId": payload.user_id,
                    "channel": payload.channel
                },
                timeout=30.0
            )
            response.raise_for_status()
            
            # n8n's 'Respond To Webhook' node returns the data
            return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error communicating with Milo Agent: {str(e)}")
