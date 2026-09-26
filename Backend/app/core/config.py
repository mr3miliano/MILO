from __future__ import annotations

import os
from dataclasses import dataclass


@dataclass
class Settings:
    APP_NAME: str = "MILO Backend"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./milo.db")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "change-me-in-production")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))


settings = Settings()
