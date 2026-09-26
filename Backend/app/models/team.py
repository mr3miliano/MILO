import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.core.database import Base


class Team(Base):
    __tablename__ = "teams"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    owner_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    plan = Column(String, nullable=False, default="free")
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)

    owner = relationship("User", back_populates="owned_teams")
    members = relationship("TeamMember", back_populates="team")
    sprints = relationship("Sprint", back_populates="team")
    tasks = relationship("Task", back_populates="team")
    documents = relationship("Document", back_populates="team")
    business_canvas = relationship("BusinessCanvas", back_populates="team")
    contracts = relationship("Contract", back_populates="team")
    crm_contacts = relationship("CRMContact", back_populates="team")
    crm_deals = relationship("CRMDeal", back_populates="team")
    channels = relationship("Channel", back_populates="team")
    agent_sessions = relationship("AgentSession", back_populates="team")
    integrations = relationship("Integration", back_populates="team")
    api_keys = relationship("APIKey", back_populates="team")
