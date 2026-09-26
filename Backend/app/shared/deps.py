from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials

from app.core.security import decode_token, security


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    payload = decode_token(credentials)
    username: str | None = payload.get("sub")
    if username is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No se pudo validar el usuario",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return {"username": username}
