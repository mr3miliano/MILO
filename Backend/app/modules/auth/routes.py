from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.modules.auth.models import User
from app.modules.auth.schemas import Token, UserCreate, UserLogin
from app.modules.auth.services import authenticate_user, build_token_for_user, create_user

router = APIRouter()


@router.post("/register", response_model=Token)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.username == user.username).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Usuario ya existe")

    new_user = create_user(db, user.username, user.email, user.password)
    return build_token_for_user(new_user)


@router.post("/login", response_model=Token)
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    auth_user = authenticate_user(db, user.username, user.password)
    if not auth_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciales inválidas")
    return build_token_for_user(auth_user)
