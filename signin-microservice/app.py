from flask import Flask, jsonify, request, session
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_session import Session
from flasgger import Swagger
import redis
import logging
from services.user_service import register_user, authenticate_user

# Initialize the Flask application
from flask_cors import CORS  # ✅ Ajoute cette ligne

app = Flask(__name__)
CORS(app, origins="*", supports_credentials=True)  # ✅ Active CORS pour tout le monde (pour le test)

# Setup logging for debugging
logging.basicConfig(level=logging.DEBUG)

# Flask-JWT and Session configurations
app.config['JWT_SECRET_KEY'] = '1234'  # Set a secure JWT secret key
app.config['SECRET_KEY'] = 'supersecretkey'  # Set a secret key for Flask sessions
app.config['SESSION_COOKIE_NAME'] = 'signin_session'  # Session cookie name
app.config['SESSION_TYPE'] = 'redis'  # Use Redis for session management
app.config['SESSION_PERMANENT'] = False  # Set session to non-permanent
app.config['SESSION_USE_SIGNER'] = True  # Sign the session cookies for security
app.config['SESSION_KEY_PREFIX'] = 'signin-session:'  # Prefix for session keys
app.config['SESSION_REDIS'] = redis.Redis(host='cache', port=6379, db=0, decode_responses=True)  # Redis setup for sessions

# Initialize JWT and session management
jwt = JWTManager(app)
Session(app)  # Initialize session management
Swagger(app)  # Initialize Swagger for API documentation

@app.route('/signup', methods=['POST'])
def signup():
    """User Registration (Swagger Spec)"""
    user_data = request.get_json()
    logging.debug(f"Received user data for signup: {user_data}")
    response, status = register_user(user_data)
    return jsonify(response), status

@app.route('/signin', methods=['POST'])
def signin():
    """User Sign-in (Swagger Spec)"""
    user_data = request.get_json()
    logging.debug(f"Received user data for signin: {user_data}")
    response, status = authenticate_user(user_data)
    return jsonify(response), status

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    """Protected Route"""
    current_user = get_jwt_identity()
    logging.debug(f"Current user logged in: {current_user}")
    return jsonify(logged_in_as=current_user), 200

if __name__ == '__main__':
    # Debugging Flask application run
    logging.debug("Starting Flask app on 0.0.0.0:5001")
    app.run(host='0.0.0.0', port=5001)