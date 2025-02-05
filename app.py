from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_redis import FlaskRedis
from config import Config

# Déclaration des instances
db = SQLAlchemy()
jwt = JWTManager()
redis_client = FlaskRedis()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialisation des extensions avec l'application Flask
    db.init_app(app)
    jwt.init_app(app)
    redis_client.init_app(app)

    # Créer toutes les tables de la base de données
    with app.app_context():
        db.create_all()

    # Enregistrer les routes
    from routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/auth")

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
