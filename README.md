# IoT Monitoring Microservices

## Description
Plateforme de monitoring IoT basée sur une architecture de microservices. Ce projet permet de collecter, gérer et visualiser les données des appareils IoT en temps réel. Il utilise des technologies modernes comme Flask, RabbitMQ, Kubernetes, MongoDB, et Docker pour une solution évolutive et performante.

## Fonctionnalités principales
- **Authentication et gestion des utilisateurs** : Utilisation de JWT pour sécuriser les accès.
- **Gestion des appareils IoT** : Enregistrement, configuration et suivi des appareils.
- **Monitoring en temps réel** : Collecte des données IoT et mise à jour en direct via Socket.IO.
- **Communication entre services** : Utilisation de RabbitMQ pour un flux de données asynchrone.

## Architecture
Le projet est divisé en trois microservices :

1. **Signing Microservice**
   - Gestion des utilisateurs (inscription, connexion).
   - Base de données : PostgreSQL.
   - Cache des sessions : Redis.

2. **Device Management Microservice**
   - Gestion des appareils IoT (ajout, suppression, configuration).
   - Base de données : PostgreSQL.
   - Publication des événements via RabbitMQ.

3. **Monitoring Microservice**
   - Réception des données des appareils via RabbitMQ.
   - Stockage des données dans MongoDB.
   - Envoi de mises à jour en temps réel aux clients via Socket.IO.

## Technologies utilisées
- **Backend** : Flask
- **Bases de données** : PostgreSQL, MongoDB, Redis
- **Communication** : RabbitMQ, HTTP REST, Socket.IO
- **Orchestration** : Kubernetes (microk8s)
- **Containerisation** : Docker

## Installation
*(À compléter avec les instructions spécifiques si nécessaire)*

## Simulation des données IoT
- Utilisez des scripts Python pour simuler des appareils IoT envoyant des données via MQTT.

---
