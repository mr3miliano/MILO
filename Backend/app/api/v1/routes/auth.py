from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import create_access_token
from app.models.user import User

router = APIRouter()


class RegisterRequest(BaseModel):
    email: EmailStr
    name: str
    google_id: str | None = None
    avatar_url: str | None = None


class LoginRequest(BaseModel):
    email: EmailStr
    google_id: str | None = None


@router.post("/register", response_model=dict)
def register_user(payload: RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == str(payload.email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Usuario ya existe")

    user = User(
        email=str(payload.email),
        name=payload.name,
        google_id=payload.google_id,
        avatar_url=payload.avatar_url,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(str(user.id))
    return {"access_token": token, "token_type": "bearer", "user": {"id": str(user.id), "email": user.email, "name": user.name}}


@router.post("/login", response_model=dict)
def login_user(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == str(payload.email)).first()
    if not user:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    if payload.google_id and user.google_id and user.google_id != payload.google_id:
        raise HTTPException(status_code=401, detail="Google ID no coincide")

    token = create_access_token(str(user.id))
    return {"access_token": token, "token_type": "bearer", "user": {"id": str(user.id), "email": user.email, "name": user.name}}


@router.get("/me", response_model=dict)
def get_me(db: Session = Depends(get_db)):
    # Placeholder mientras no se implementa auth real con dependencia.
    # La ruta real será protegida con get_current_user luego.
    user = db.query(User).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"id": str(user.id), "email": user.email, "name": user.name, "google_id": user.google_id}
