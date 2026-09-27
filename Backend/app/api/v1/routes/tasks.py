from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.task import Task

router = APIRouter()

class TaskCreateRequest(BaseModel):
    team_id: UUID
    sprint_id: UUID
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    status: str = "todo"
    assignee_id: Optional[UUID] = None

class TaskUpdateRequest(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    assignee_id: Optional[UUID] = None

@router.get("/", response_model=List[dict])
def list_tasks(team_id: Optional[UUID] = None, db: Session = Depends(get_db)):
    query = db.query(Task)
    if team_id:
        query = query.filter(Task.team_id == team_id)
    tasks = query.all()
    return [{
        "id": str(task.id),
        "team_id": str(task.team_id) if task.team_id else None,
        "sprint_id": str(task.sprint_id) if task.sprint_id else None,
        "title": task.title,
        "description": task.description,
        "status": task.status,
        "assignee_id": str(task.assignee_id) if task.assignee_id else None,
        "created_at": task.created_at.isoformat() if task.created_at else None,
    } for task in tasks]

@router.post("/", response_model=dict, status_code=status.HTTP_201_CREATED)
def create_task(payload: TaskCreateRequest, db: Session = Depends(get_db)):
    task = Task(
        team_id=payload.team_id,
        sprint_id=payload.sprint_id,
        title=payload.title,
        description=payload.description,
        status=payload.status,
        assignee_id=payload.assignee_id
    )
    db.add(task)
    db.commit()
    db.refresh(task)

    return {
        "id": str(task.id),
        "team_id": str(task.team_id),
        "sprint_id": str(task.sprint_id),
        "title": task.title,
        "description": task.description,
        "status": task.status,
        "assignee_id": str(task.assignee_id) if task.assignee_id else None,
        "created_at": task.created_at.isoformat() if task.created_at else None,
    }

@router.put("/{task_id}", response_model=dict)
def update_task(task_id: UUID, payload: TaskUpdateRequest, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")

    if payload.title is not None:
        task.title = payload.title
    if payload.description is not None:
        task.description = payload.description
    if payload.status is not None:
        task.status = payload.status
    if payload.assignee_id is not None:
        task.assignee_id = payload.assignee_id

    db.commit()
    db.refresh(task)

    return {
        "id": str(task.id),
        "team_id": str(task.team_id),
        "sprint_id": str(task.sprint_id),
        "title": task.title,
        "description": task.description,
        "status": task.status,
        "assignee_id": str(task.assignee_id) if task.assignee_id else None,
        "created_at": task.created_at.isoformat() if task.created_at else None,
    }

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: UUID, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Tarea no encontrada")
    db.delete(task)
    db.commit()
    return None
