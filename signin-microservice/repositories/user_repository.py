from dal import create_connection

def save_user(email, hashed_password):
    cnx = create_connection()
    if cnx:
        cursor = cnx.cursor()
        try:
            cursor.execute('INSERT INTO T_USER (email, password) VALUES (%s, %s);', (email, hashed_password))
            cnx.commit()
            return True
        except:
            return False
    return False

def get_user_by_email(email):
    cnx = create_connection()
    if cnx:
        cursor = cnx.cursor()
        cursor.execute('SELECT email, password FROM T_USER WHERE email=%s;', (email,))
        row = cursor.fetchone()
        if row:
            return {"email": row[0], "password": row[1]}
    return None
