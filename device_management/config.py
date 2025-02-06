import os

class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql://admin:1234@db/db_ms"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    REDIS_URL = os.getenv('REDIS_URL', 'redis://cache:6379/0')

    RABBITMQ_URL = os.getenv('RABBITMQ_URL', 'amqp://guest:guest@rabbitmq:5672/')
