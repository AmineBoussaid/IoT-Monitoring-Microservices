from flask import jsonify
from dal import DeviceDAL

class DeviceBusiness:
    @staticmethod
    def list_devices():
        try:
            devices = DeviceDAL.get_all_devices()
            print(f"Devices fetched: {devices}")  # Log de la liste des dispositifs
            return jsonify({'devices': devices}), 200
        except Exception as e:
            print(f"Error in list_devices: {str(e)}")
            return jsonify({"error": f"Erreur serveur: {str(e)}"}), 500

    @staticmethod
    def create_device(request):
        data = request.get_json()
        if not data.get('name'):
            return jsonify({"error": "Le nom est requis"}), 400

        device_id = DeviceDAL.insert_device(data)
        if device_id:
            event_data = {'event': 'device_created', 'device_id': device_id, 'name': data['name']}
            print("Donnees de l'evenement:", event_data)
            DeviceBusiness.publish_event(event_data)
            return jsonify({"message": "Dispositif cree", "id": device_id}), 201
        return jsonify({"error": "Erreur lors de la creation"}), 500

    @staticmethod
    def update_device(device_id, request):
        data = request.get_json()
        if DeviceDAL.update_device(device_id, data):
            event_data = {'event': 'device_updated', 'device_id': device_id}
            DeviceBusiness.publish_event(event_data)
            return jsonify({"message": "Dispositif mis a jour"}), 200
        return jsonify({"error": "Erreur lors de la mise a jour"}), 500

    @staticmethod
    def delete_device(device_id):
        if DeviceDAL.delete_device(device_id):
            event_data = {'event': 'device_deleted', 'device_id': device_id}
            DeviceBusiness.publish_event(event_data)
            return jsonify({"message": "Dispositif supprime"}), 200
        return jsonify({"error": "Erreur lors de la suppression"}), 500

    # Si tu souhaites également proposer une recherche, il faudra harmoniser l'utilisation
    # (ici la fonction est basée sur SQLAlchemy, alors que list_devices utilise psycopg2).
    @staticmethod
    def search_devices(query):
        try:
            devices = DeviceDAL.search_devices(query)
            return jsonify({'devices': devices}), 200
        except Exception as e:
            print(f"Error in search_devices: {str(e)}")
            return jsonify({"error": f"Erreur serveur: {str(e)}"}), 500
