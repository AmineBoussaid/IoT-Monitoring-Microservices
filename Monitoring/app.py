from flask import Flask, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import pika
import json
import threading
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

client = MongoClient('mongodb://localhost:27017/')
db = client.iot_monitoring
device_data = db.device_data

def setup_rabbitmq():
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    channel.queue_declare(queue='device_events')
    return channel

def callback(ch, method, properties, body):
    try:
        data = json.loads(body)
        device_data.insert_one(data)
        socketio.emit('device_update', data)
    except Exception as e:
        print(f"Erreur de traitement du message: {e}")

@app.route('/monitoring/history/<device_id>', methods=['GET'])
def get_device_history(device_id):
    try:
        history = list(device_data.find({'device_id': device_id}, {'_id': 0}))
        return jsonify({'history': history})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route pour obtenir les statistiques
@app.route('/monitoring/stats', methods=['GET'])
def get_stats():
    try:
        stats = {
            'total_devices': device_data.distinct('device_id').count(),
            'total_events': device_data.count_documents({}),
            'active_devices': device_data.distinct('device_id', {'status': 'active'}).count()
        }
        return jsonify(stats)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def start_rabbitmq_consumer():
    channel = setup_rabbitmq()
    channel.basic_consume(
        queue='device_events',
        on_message_callback=callback,
        auto_ack=True
    )
    channel.start_consuming()

if __name__ == '__main__':
    consumer_thread = threading.Thread(target=start_rabbitmq_consumer)
    consumer_thread.daemon = True
    consumer_thread.start()
    
    socketio.run(app, debug=True, host='0.0.0.0', port=5002) 