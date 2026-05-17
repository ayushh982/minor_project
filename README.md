# Smart AI-Based Traffic Management System – Backend Documentation

## Overview

This backend is built for a Smart AI-Based Traffic Management System designed for traffic authorities. The system processes traffic data, manages signal timings dynamically, handles emergency vehicle prioritization, tracks traffic violations, and provides realtime dashboard updates.

The backend is designed using a scalable production-style architecture with realtime communication support.

---

# Backend Technologies Used

## Core Technologies

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* Axios
* Multer
* Cloudinary (future integration)

---

# Architecture

The backend follows a layered architecture:

Routes
→ Controllers
→ Services
→ Models (MongoDB)
→ Socket.IO Realtime Events

### Responsibilities

## Routes

Define API endpoints and route requests.

## Controllers

Handle incoming requests and outgoing responses.

## Services

Contain core business logic:

* signal timing calculation
* dashboard data aggregation
* ML communication

## Models

Store data in MongoDB.

## Socket.IO

Push realtime updates to frontend dashboard.

---

# Backend Folder Structure

backend/
│
├── server.js
│
├── src/
│   ├── app.js
│   ├── db/
│   │   └── index.js
│   │
│   ├── controllers/
│   │   ├── traffic.controller.js
│   │   ├── signal.controller.js
│   │   ├── violation.controller.js
│   │   ├── emergency.controller.js
│   │   └── dashboard.controller.js
│   │
│   ├── models/
│   │   ├── traffic.model.js
│   │   ├── signal.model.js
│   │   ├── violation.model.js
│   │   └── emergency.model.js
│   │
│   ├── routes/
│   │   ├── traffic.routes.js
│   │   ├── signal.routes.js
│   │   ├── violation.routes.js
│   │   ├── emergency.routes.js
│   │   └── dashboard.routes.js
│   │
│   ├── services/
│   │   ├── signal.service.js
│   │   ├── dashboard.service.js
│   │   └── ml.service.js
│   │
│   ├── middlewares/
│   │   └── multer.middleware.js
│   │
│   ├── sockets/
│   │   └── index.js
│   │
│   └── utils/
│       ├── ApiError.js
│       ├── ApiResponse.js
│       ├── asyncHandler.js
│       └── cloudinary.js

---

# Core Backend Features

## 1. Traffic Management

Stores:

* lane vehicle count
* total traffic
* weather condition
* emergency detection

Calculates:

* active signal lane
* dynamic signal timing

---

## 2. Signal Optimization

Signal timings are generated dynamically based on:

* lane traffic density
* total traffic
* weather condition
* emergency status

---

## 3. Emergency Vehicle Handling

Supports:

* ambulance priority
* emergency signal override
* realtime emergency alerts

---

## 4. E-Challan / Violation System

Tracks:

* overspeeding
* rule violations
* plate number
* intersection details

---

## 5. Realtime Dashboard System

Socket.IO is used for:

* live traffic updates
* live signal updates
* emergency alerts
* violation alerts

---

# MongoDB Models

## Traffic Model

Stores:

* intersectionId
* lane vehicle counts
* total vehicles
* weather condition
* emergency detection

---

## Signal Model

Stores:

* active lane
* signal timings
* emergency mode

---

## Violation Model

Stores:

* plate number
* violation type
* speed
* image URL
* timestamp

---

## Emergency Model

Stores:

* emergency vehicle type
* lane
* override duration
* active status

---

# Backend APIs

Base URL:

http://localhost:8000/api/v1

---

# Traffic APIs

## Save Traffic Data

POST /traffic/data

Purpose:
Save processed traffic data and generate signal timings.

---

## Get Live Traffic

GET /traffic/live/:intersectionId

Purpose:
Fetch latest traffic data.

---

## Get Traffic History

GET /traffic/history/:intersectionId

Purpose:
Fetch historical traffic records.

---

## Upload Video

POST /traffic/upload

Purpose:
Upload traffic video for ML processing.

---

# Signal APIs

## Get Current Signal

GET /signals/current/:intersectionId

---

## Manual Signal Override

POST /signals/override

---

# Violation APIs

## Create Violation

POST /violations

---

## Get Violations

GET /violations/:intersectionId

---

## Get Single Violation

GET /violations/details/:id

---

# Emergency APIs

## Trigger Emergency

POST /emergency/trigger

---

## Get Emergency Status

GET /emergency/status/:intersectionId

---

# Dashboard API

## Get Complete Dashboard Data

GET /dashboard/:intersectionId

Purpose:
Returns:

* traffic
* signal
* violations
* emergency status

This is the main API used by the frontend dashboard.

---

# Socket.IO Events

The backend emits realtime events:

## traffic-update

Sent when traffic data changes.

## signal-update

Sent when signal timings change.

## violation-update

Sent when new challan is generated.

## emergency-alert

Sent during emergency vehicle override.

---

# Current Backend Status

Completed:

* Backend architecture
* MongoDB integration
* REST APIs
* Socket.IO integration
* Traffic logic
* Dashboard API
* Realtime event system

Pending:

* ML model integration
* Frontend integration
* Cloudinary integration
* Authentication system

---

# ML Team Integration Guide

The ML model should send processed traffic data to:

POST /api/v1/traffic/data

Expected JSON format:

{
"intersectionId": "A1",
"lanes": [24, 8, 12, 5],
"emergencyDetected": false,
"weatherCondition": "Clear"
}

The backend will:

* save traffic data
* calculate signal timings
* store signal data
* emit realtime updates

---

# Frontend Team Integration Guide

Frontend should mainly use:

GET /api/v1/dashboard/:intersectionId

for dashboard rendering.

Frontend should also listen to Socket.IO events:

* traffic-update
* signal-update
* violation-update
* emergency-alert

Frontend stack recommendation:

* React
* Axios
* Socket.IO Client

---

# Future Scope

* Realtime traffic camera integration
* AI-based congestion prediction
* Heatmap generation
* Cloud storage integration
* Role-based authentication
* Analytics dashboard
* Automated challan generation
