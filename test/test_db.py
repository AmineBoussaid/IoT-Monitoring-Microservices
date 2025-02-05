from sqlalchemy import create_engine
import urllib.parse

DATABASE_URL = "postgresql://user:password@localhost:5432/signing"

print("🔍 URL de connexion utilisée :", DATABASE_URL)

try:
    engine = create_engine(DATABASE_URL)
    conn = engine.connect()
    print("✅ Connexion SQLAlchemy à PostgreSQL réussie avec UTF-8 !")
    conn.close()
except Exception as e:
    print("❌ ERREUR SQLAlchemy :", e)
