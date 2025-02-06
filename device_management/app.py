from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
from controllers import device_bp
from business import DeviceBusiness
from flask import request
from models import db

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

db.init_app(app)

jwt = JWTManager(app)
@app.route('/')
def home():
    return "Device Management !"
app.register_blueprint(device_bp)
@app.route('/devices/<device_name>', methods=['GET'])
def search_devices(device_name):
    query = request.args.get('q') 
    if query:
        return DeviceBusiness.search_devices(query)
    else:
        return  f"Device Not found: {device_name}"
    

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)
