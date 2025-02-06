from psycopg2 import connect

def create_connection():
    try:
        return connect(
            host='db',
            user='admin',
            password='1234',
            database='db_ms'
        )
    except Exception as e:
        print(f"Database connection error: {e}")
        return None
