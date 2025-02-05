import os

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "supersecret")
    SQLALCHEMY_DATABASE_URI = "postgresql://user:password@localhost:5432/signing"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "jwtsecret")
    REDIS_URL = "redis://redis:6379/0"
print("URL de connexion à PostgreSQL :", Config.SQLALCHEMY_DATABASE_URI)
