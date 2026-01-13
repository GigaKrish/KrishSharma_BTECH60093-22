import os
from pathlib import Path
from dotenv import load_dotenv

# Path fix: Go up 3 levels (config.py -> core -> app -> backend)
env_path = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path)


class Settings:
    PROJECT_NAME: str = "Kanban Task Manager"

    # Database URL: uses .env or defaults to local SQLite
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./kanban.db")

    # Secret Key: critical for login/signup
    SECRET_KEY: str = os.getenv("SECRET_KEY")

    # Debugging: Print to terminal so you know it worked
    print(f"\n[CONFIG] Loading .env from: {env_path}")
    if SECRET_KEY:
        print("[CONFIG] SECRET_KEY loaded successfully.\n")
    else:
        print("[CONFIG] ⚠️  WARNING: SECRET_KEY is missing! Authentication will fail.\n")
        # Fallback to prevent immediate crash
        SECRET_KEY = "fallback_secret_key_for_dev_only"

    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))


settings = Settings()