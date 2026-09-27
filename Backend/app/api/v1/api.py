from fastapi import APIRouter

from app.api.v1.routes.auth import router as auth_router
from app.api.v1.routes.teams import router as teams_router
from app.api.v1.routes.connectors import router as connectors_router
from app.api.v1.routes.tasks import router as tasks_router
from app.api.v1.routes.agent import router as agent_router

router = APIRouter(prefix="/api/v1")

router.include_router(auth_router, prefix="/auth", tags=["auth"])
router.include_router(teams_router, prefix="/teams", tags=["teams"])
router.include_router(connectors_router, prefix="/connectors", tags=["connectors"])
router.include_router(tasks_router, prefix="/tasks", tags=["tasks"])
router.include_router(agent_router, prefix="/agent", tags=["agent"])
