import uuid
from app.core.database import SessionLocal, engine, Base
from app.models.team import Team
from app.models.user import User
from app.models.team_member import TeamMember
from app.models.integration import Integration
from app.models.sprint import Sprint
from app.models.task import Task
from datetime import datetime, timedelta

def seed_db():
    print("Iniciando seeder...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Check if we already seeded
    if db.query(Team).first():
        print("La base de datos ya tiene datos. Saliendo...")
        db.close()
        return

    print("Creando equipo de prueba...")
    team1 = Team(id=uuid.UUID("00000000-0000-0000-0000-000000000001"), name="Equipo Alpha", owner_id=uuid.UUID("00000000-0000-0000-0000-000000000002"), plan="pro")
    db.add(team1)

    print("Creando usuario Daniel...")
    user1 = User(id=uuid.UUID("00000000-0000-0000-0000-000000000002"), email="daniel@example.com", name="Daniel Flores")
    db.add(user1)
    db.commit()

    print("Agregando usuario al equipo...")
    member = TeamMember(team_id=team1.id, user_id=user1.id, role="admin")
    db.add(member)

    print("Agregando sprint...")
    sprint = Sprint(
        team_id=team1.id, 
        name="Sprint 1 - Innovathon", 
        start_date=datetime.utcnow(), 
        end_date=datetime.utcnow() + timedelta(days=14),
        status="active"
    )
    db.add(sprint)
    db.commit()

    print("Agregando tareas...")
    task1 = Task(team_id=team1.id, sprint_id=sprint.id, title="Implementar Frontend n8n", status="done", assignee_id=user1.id)
    task2 = Task(team_id=team1.id, sprint_id=sprint.id, title="Conectar Supabase DB", status="in_progress", priority="highest", assignee_id=user1.id)
    task3 = Task(team_id=team1.id, sprint_id=sprint.id, title="Crear agentes de Milo", status="todo", assignee_id=user1.id)
    db.add_all([task1, task2, task3])

    print("Agregando integraciones...")
    int1 = Integration(team_id=team1.id, provider="telegram", vault_secret_ref="bot_father_token")
    int2 = Integration(team_id=team1.id, provider="github", vault_secret_ref="github_oauth_token")
    db.add_all([int1, int2])

    db.commit()
    db.close()
    print("¡Base de datos sembrada con éxito!")

if __name__ == "__main__":
    seed_db()
