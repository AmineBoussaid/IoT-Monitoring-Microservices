from werkzeug.security import generate_password_hash, check_password_hash
from repositories.user_repository import save_user, get_user_by_email
from flask_jwt_extended import create_access_token


def register_user(user_data):
    email = user_data.get('email')
    password = user_data.get('password')
    
    if not email or not password:
        return {"error": "Email and password are required"}, 400

    hashed_password = generate_password_hash(password)
    
    success = save_user(email, hashed_password)
    if success:
        return {"message": "User registered successfully"}, 201
    return {"error": "Email already exists"}, 400

def authenticate_user(user_data):
    email = user_data.get('email')
    password = user_data.get('password')

    user = get_user_by_email(email)
    if user and check_password_hash(user['password'], password):
        access_token = create_access_token(identity=user['email'])
        return {"access_token": access_token, "user": user['email']}, 200
    return {"error": "Invalid credentials"}, 401
