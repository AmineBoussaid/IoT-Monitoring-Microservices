FROM python:3.9-slim

WORKDIR /app

# Create and activate virtual environment

# Ensure venv is used

# Copy requirements.txt (if empty, manually install Flask later)
COPY requirements.txt . 

# Install dependencies (if any)
RUN pip install --no-cache-dir -r requirements.txt || true

# Copy the entire application
COPY . .

ENV FLASK_APP=app.py
# Expose the Flask application port
EXPOSE 5002

# Start Flask with correct venv path
CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0", "--port=5002"]
