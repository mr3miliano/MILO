from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field


class ConnectorCreate(BaseModel):
    provider: str
    connector_type: str
    display_label: Optional[str] = None


class ConnectorRead(BaseModel):
    id: UUID
    team_id: UUID
    provider: str
    connector_type: str
    status: str
    display_label: Optional[str] = None

    class Config:
        orm_mode = True
