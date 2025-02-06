import pika
import json
import time
import random
from datetime import datetime

def simulate_device_data():
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    channel.queue_declare(queue='device_events')

    device_ids = ['device1', 'device2', 'device3']
    event_types = ['temperature', 'humidity', 'pressure']

    while True:
        for device_id in device_ids:
            data = {
                'device_id': device_id,
                'type': random.choice(event_types),
                'value': random.uniform(20, 30),
                'timestamp': datetime.now().isoformat(),
                'status': random.choice(['active', 'inactive'])
            }

            channel.basic_publish(
                exchange='',
                routing_key='device_events',
                body=json.dumps(data)
            )
            print(f"Envoyé: {data}")
            time.sleep(2)

if __name__ == '__main__':
    try:
        simulate_device_data()
    except KeyboardInterrupt:
        print("Simulation arrêtée") 