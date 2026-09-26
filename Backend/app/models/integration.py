import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.core.database import Base


class Integration(Base):
    __tablename__ = "integrations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    team_id = Column(UUID(as_uuid=True), ForeignKey("teams.id", ondelete="CASCADE"), nullable=False)
    provider = Column(String, nullable=False)
    vault_secret_ref = Column(String, nullable=True)
    connected_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)

    team = relationship("Team", back_populates="integrations")
