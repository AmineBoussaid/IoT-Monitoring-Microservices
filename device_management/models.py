from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Device(db.Model):
    __tablename__ = 'devices'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    status = db.Column(db.String(50), nullable=False, default='inactive')
    # On peut stocker la configuration sous forme de JSON
    configuration = db.Column(db.JSON)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
