# IoT Monitoring Microservices

A cloud-native IoT monitoring platform built with a scalable microservices architecture.  
It collects device telemetry, processes events asynchronously, and provides real-time monitoring for connected systems.

## Key Features

- **Microservices architecture** with clear service boundaries
- **Secure authentication** using JWT
- **Asynchronous messaging** via RabbitMQ for reliable inter-service communication
- **Real-time monitoring** powered by Socket.IO
- **Containerized deployment** with Docker and Kubernetes-ready setup
- **Multi-database strategy** (PostgreSQL, MongoDB, Redis) based on service needs

## Architecture Overview

The platform is split into three independent services:

- **Signing Service**  
  Handles user management and authentication.

- **Device Management Service**  
  Manages IoT devices, configurations, and lifecycle operations.

- **Monitoring Service**  
  Ingests telemetry, stores data, and streams real-time updates.

**Communication flow:**  
IoT events → RabbitMQ → Monitoring consumers → Storage + live updates to clients.

## Tech Stack

### Backend
- Python
- Flask
- Flask-SocketIO
- Flask-JWT-Extended

### Data & Messaging
- PostgreSQL
- MongoDB
- Redis
- RabbitMQ

### Realtime & IoT
- Socket.IO
- MQTT

### DevOps
- Docker
- Kubernetes (microk8s)

## How to Run

### Prerequisites
- Docker & Docker Compose
- (Optional) Kubernetes / microk8s

### Quick Start (Docker)

1. Clone the repository:
   ```bash
   git clone https://github.com/AmineBoussaid/IoT-Monitoring-Microservices.git
   cd IoT-Monitoring-Microservices
   ```

2. Start the platform:
   ```bash
   docker compose up --build
   ```

3. Access services using the configured ports in your compose/environment files.

## Future Improvements

- Add centralized observability (Prometheus + Grafana)
- Introduce API Gateway and service discovery
- Implement CI/CD pipelines with automated tests and deployments
- Add role-based access control and audit logging
