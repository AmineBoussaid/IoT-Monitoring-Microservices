import psycopg2
import os
import json
from models import db  # Si tu utilises SQLAlchemy ailleurs, mais ici on utilise psycopg2

def get_db_connection():
    try:
        return psycopg2.connect(
            database=os.getenv('DEVICE_DB', 'db_ms'),
            user=os.getenv('DEVICE_DB_USER', 'postgres'),
            password=os.getenv('DEVICE_DB_PASSWORD', '1234'),
            host=os.getenv('DEVICE_DB_HOST', 'db'),
            port=os.getenv('DEVICE_DB_PORT', '5432')
        )
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        raise  

class DeviceDAL:
    @staticmethod
    def get_all_devices():
        devices = []
        try:
            print("Connecting to the database...")
            conn = get_db_connection()
            cur = conn.cursor()
            
            print("Executing query...")
            # On sélectionne les colonnes souhaitées (id, name, description, status, configuration)
            cur.execute("SELECT id, name, description, status, configuration FROM devices")
            rows = cur.fetchall()
            print(f"Number of rows fetched: {len(rows)}")
            
            for row in rows:
                # Traitement de la configuration qui peut être une chaîne JSON ou déjà un dictionnaire
                try:
                    config_data = row[4]
                    if isinstance(config_data, dict):
                        configuration = config_data
                    elif isinstance(config_data, str):
                        configuration = json.loads(config_data) if config_data else {}
                    else:
                        configuration = {}
                    
                    device = {
                        'id': row[0],
                        'name': row[1],
                        'description': row[2] if row[2] else '',
                        'status': row[3] if row[3] else 'inactive',
                        'configuration': configuration
                    }
                    devices.append(device)
                except json.JSONDecodeError as je:
                    print(f"JSON decode error for row {row[0]}: {str(je)}")
                    devices.append({
                        'id': row[0],
                        'name': row[1],
                        'description': row[2] if row[2] else '',
                        'status': row[3] if row[3] else 'inactive',
                        'configuration': {}
                    })
            
            cur.close()
            conn.close()
            return devices
            
        except Exception as e:
            print(f"Database error in get_all_devices: {str(e)}")
            raise  

    @staticmethod
    def insert_device(data):
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO devices (name, description, status, configuration) VALUES (%s, %s, %s, %s) RETURNING id",
            (data['name'], data.get('description', ''), data.get('status', 'inactive'), json.dumps(data.get('configuration', {})))
        )
        device_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return device_id

    @staticmethod
    def update_device(device_id, data):
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            "UPDATE devices SET name = %s, description = %s, status = %s, configuration = %s WHERE id = %s",
            (data.get('name'), data.get('description'), data.get('status'), json.dumps(data.get('configuration', {})), device_id)
        )
        conn.commit()
        conn.close()
        return True

    @staticmethod
    def delete_device(device_id):
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("DELETE FROM devices WHERE id = %s", (device_id,))
        conn.commit()
        conn.close()
        return True

    @staticmethod
    def search_devices(query):
        try:
            # Ici, nous utilisons SQLAlchemy pour la recherche
            # Assurez-vous que le modèle Device est correctement défini dans models.py
            devices = db.session.query(Device).filter(Device.name.ilike(f'%{query}%')).all()
            # Pour retourner un format JSON, vous pouvez convertir chaque objet en dictionnaire
            # Exemple simple (à adapter selon la définition de votre modèle Device) :
            devices_list = [device.to_dict() for device in devices]
            return devices_list
        except Exception as e:
            print(f"Database error in search_devices: {str(e)}")
            raise  
