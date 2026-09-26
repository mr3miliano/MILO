from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.modules.auth.routes import router as auth_router
from app.modules.business.routes import router as business_router
from app.modules.dev.routes import router as dev_router
from app.modules.messaging.routes import router as messaging_router
from app.modules.agent.routes import router as agent_router

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="API principal de MILO",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(business_router, prefix="/api/business", tags=["business"])
app.include_router(dev_router, prefix="/api/dev", tags=["dev"])
app.include_router(messaging_router, prefix="/api/messaging", tags=["messaging"])
app.include_router(agent_router, prefix="/api/agent", tags=["agent"])


@app.get("/health")
def health_check():
    return {"status": "ok", "app": settings.APP_NAME}
