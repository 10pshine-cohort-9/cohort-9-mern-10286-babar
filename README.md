# cohort-9-mern-10286-babar

Cohort 9 — MERN (NodeJS + ReactJS) assignment for **Babar Rahim**.

---

# Notes App

## Overview

The Notes App is a full-stack web application that allows authenticated users to create, update, and delete their personal notes.

This repository currently contains the **Backend Project Setup**, including the Express server configuration, middleware setup, environment configuration, and a health check endpoint.

Future phases will implement:

- PostgreSQL Database
- Prisma ORM
- Authentication
- Notes CRUD APIs
- Rich Text Editor
- Pino Logging
- Global Exception Handling
- Unit Testing
- SonarQube Integration

---

## Technology Stack

### Backend

- Node.js
- Express.js
- CORS
- Helmet
- dotenv

### Frontend (Upcoming)

- React.js
- Vite

### Database (Upcoming)

- PostgreSQL
- Prisma ORM

---

## Folder Structure

```text
backend/
│
├── src/
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.example
├── package.json
└── package-lock.json

docs/
README.md
```

---

## Prerequisites

Before running the project, install:

- Node.js (v20 or above)
- npm

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

## Running the Backend

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Server URL:

```
http://localhost:5000
```

Health Check Endpoint:

```
GET /
```

Response:

```json
{
  "success": true,
  "message": "Notes API is running"
}
```

---

## Current Progress

✅ Backend Project Setup Completed

Completed tasks:

- Express Server Setup
- Environment Configuration
- CORS Middleware
- Helmet Middleware
- JSON Middleware
- Health Check Endpoint
- Project Structure

---

## Project Phases

- ✅ Phase 1 — Project Setup
- ⏳ Phase 2 — Database
- ⏳ Phase 3 — Authentication
- ⏳ Phase 4 — Notes CRUD
- ⏳ Phase 5 — Rich Text Editor
- ⏳ Phase 6 — Logging
- ⏳ Phase 7 — Global Exception Handling
- ⏳ Phase 8 — Testing
- ⏳ Phase 9 — SonarQube
- ⏳ Phase 10 — Optional Features

---

## License

This project is developed as part of the **10Pearls SHINE Cohort 9 MERN Assignment**.