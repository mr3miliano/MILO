from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.integration import Integration
from app.schemas.connector import ConnectorCreate, ConnectorRead

router = APIRouter()


@router.get("/{team_id}", response_model=List[ConnectorRead])
def list_connectors(team_id: UUID, db: Session = Depends(get_db)):
    connectors = db.query(Integration).filter(Integration.team_id == team_id).all()
    return connectors


@router.post("/{team_id}", response_model=ConnectorRead, status_code=status.HTTP_201_CREATED)
def create_connector(team_id: UUID, payload: ConnectorCreate, db: Session = Depends(get_db)):
    connector = Integration(
        team_id=team_id,
        provider=payload.provider,
        vault_secret_ref=payload.display_label,
    )
    db.add(connector)
    db.commit()
    db.refresh(connector)
    return connector
