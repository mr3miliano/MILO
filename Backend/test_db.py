import os
import sys

from sqlalchemy import text
from app.core.database import engine, Base
from app.models.integration import Integration

def main():
    try:
        with engine.connect() as conn:
            # Test connection
            res = conn.execute(text("SELECT 1"))
            print("DB Connection successful!")
            print(f"Result: {res.fetchone()}")

            # Create tables if they don't exist
            print("Creating tables...")
            Base.metadata.create_all(bind=engine)
            print("Tables created successfully (or already exist)!")

            # Test query
            res = conn.execute(text("SELECT count(*) FROM integrations"))
            count = res.fetchone()[0]
            print(f"Found {count} integrations in the database.")

    except Exception as e:
        print(f"DB Error: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
