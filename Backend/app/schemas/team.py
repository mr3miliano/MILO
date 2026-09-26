from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field


class TeamCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    plan: str = "free"


class TeamRead(BaseModel):
    id: UUID
    name: str
    owner_id: UUID
    plan: str

    class Config:
        orm_mode = True
