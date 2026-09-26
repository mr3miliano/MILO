from __future__ import annotations

import os
from dataclasses import dataclass

from dotenv import load_dotenv

load_dotenv()


@dataclass
class Settings:
    APP_NAME: str = "MILO Backend"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./milo.db")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "change-me-in-production")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))
    N8N_BASE_URL: str = os.getenv("N8N_BASE_URL", "")
    N8N_API_KEY: str = os.getenv("N8N_API_KEY", "")
    N8N_API_VERSION: str = os.getenv("N8N_API_VERSION", "v1")
    N8N_TEMPLATE_WORKFLOW_ID: str = os.getenv("N8N_TEMPLATE_WORKFLOW_ID", "")
    N8N_PROJECT_ID: str = os.getenv("N8N_PROJECT_ID", "")
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")


settings = Settings()
