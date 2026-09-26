from sqlalchemy.orm import Session

from app.core.security import get_password_hash, verify_password, create_access_token
from app.modules.auth.models import User


def create_user(db: Session, username: str, email: str, password: str):
    user = User(username=username, email=email, hashed_password=get_password_hash(password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user


def build_token_for_user(user: User):
    access_token = create_access_token(subject=user.username)
    return {"access_token": access_token, "token_type": "bearer"}
