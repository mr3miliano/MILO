import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.core.database import Base


class AgentSession(Base):
    __tablename__ = "agent_sessions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    team_id = Column(UUID(as_uuid=True), ForeignKey("teams.id", ondelete="CASCADE"), nullable=False)
    channel_id = Column(UUID(as_uuid=True), ForeignKey("channels.id", ondelete="SET NULL"), nullable=True)
    context = Column(JSON, default={})
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)

    team = relationship("Team", back_populates="agent_sessions")
    channel = relationship("Channel", back_populates="agent_sessions")
    logs = relationship("AgentLog", back_populates="session")
