from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.team import Team
from app.models.team_member import TeamMember
from app.models.user import User

router = APIRouter()


class TeamCreateRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    plan: str = "free"


@router.get("/", response_model=List[dict])
def list_teams(db: Session = Depends(get_db)):
    teams = db.query(Team).all()
    return [{
        "id": str(team.id),
        "name": team.name,
        "owner_id": str(team.owner_id),
        "plan": team.plan,
        "created_at": team.created_at.isoformat() if team.created_at else None,
    } for team in teams]


@router.post("/", response_model=dict, status_code=status.HTTP_201_CREATED)
def create_team(payload: TeamCreateRequest, db: Session = Depends(get_db)):
    owner = db.query(User).first()
    if not owner:
        raise HTTPException(status_code=400, detail="Debe existir un usuario para crear el equipo")

    team = Team(name=payload.name, owner_id=owner.id, plan=payload.plan)
    db.add(team)
    db.commit()
    db.refresh(team)

    member = TeamMember(team_id=team.id, user_id=owner.id, role="owner")
    db.add(member)
    db.commit()

    return {
        "id": str(team.id),
        "name": team.name,
        "owner_id": str(team.owner_id),
        "plan": team.plan,
        "created_at": team.created_at.isoformat() if team.created_at else None,
    }


@router.get("/{team_id}", response_model=dict)
def get_team(team_id: UUID, db: Session = Depends(get_db)):
    team = db.query(Team).filter(Team.id == team_id).first()
    if not team:
        raise HTTPException(status_code=404, detail="Equipo no encontrado")
    return {
        "id": str(team.id),
        "name": team.name,
        "owner_id": str(team.owner_id),
        "plan": team.plan,
        "created_at": team.created_at.isoformat() if team.created_at else None,
    }
