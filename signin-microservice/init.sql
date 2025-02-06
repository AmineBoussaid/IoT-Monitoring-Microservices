DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'db_ms') THEN
        CREATE DATABASE db_ms;
    END IF;
END $$;

\c db_ms;

CREATE TABLE IF NOT EXISTS T_USER( 
    id SERIAL PRIMARY KEY,
    email VARCHAR(30) UNIQUE,
    password VARCHAR(255),
    isadmin BOOLEAN DEFAULT FALSE
);
