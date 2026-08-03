# cohort-9-mern-10286-babar

Cohort 9 — MERN (NodeJS + ReactJS) assignment for **Babar Rahim**.

---

# Notes App

A full-stack Notes application built using React.js and Node.js.

This project is being developed as part of the **10Pearls Shine MERN Internship** using a feature-branch workflow.

---

# Overview

The Notes App enables authenticated users to manage personal notes securely.

## Implemented in this repository

- Backend project setup
- Frontend project setup
- PostgreSQL database configuration
- Prisma ORM configuration
- Initial database schema
- Database migration setup

## Planned for future phases

- User Authentication
- Notes CRUD APIs
- Rich Text Editor
- Dashboard
- Pino Logger
- Global Exception Handling
- Unit Testing (Mocha/Chai & Jest)
- SonarQube Integration

---

# Technology Stack

## Currently Implemented

### Frontend

- React.js
- Vite
- React Router
- Axios

### Backend

- Node.js
- Express.js

### Database

- PostgreSQL
- Prisma ORM

---

## Planned

- Authentication
- Rich Text Editor
- Pino Logger
- Mocha / Chai
- Jest
- SonarQube

---

# Folder Structure

```text
backend/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
├── package.json
└── prisma.config.ts

frontend/
├── src/
├── public/
└── package.json
```

---

# Prerequisites

Install the following before running the project:

- Node.js (v20+)
- npm
- PostgreSQL
- Git

---

# Installation

Clone the repository

```bash
git clone <repository-url>
cd cohort-9-mern-10286-babar
```

Install backend dependencies

```bash
cd backend
npm install
```

Install frontend dependencies

```bash
cd ../frontend
npm install
```

---

# Running the Application

## Backend

```bash
cd backend
npm run dev
```

Backend runs on

```
http://localhost:5000
```

Health Check

```
GET /
```

Example Response

```json
{
  "success": true,
  "message": "Notes API is running"
}
```

---

## Frontend

```bash
cd frontend
npm run dev
```

---

# Database

Current database implementation includes:

- PostgreSQL configuration
- Prisma ORM configuration
- Initial migration
- User model
- Note model

---

# Current Progress

| Phase | Status |
|--------|--------|
| Backend Project Setup | ✅ Completed |
| Frontend Project Setup | ✅ Completed |
| PostgreSQL Setup | ✅ Completed |
| Prisma ORM Setup | ✅ Completed |
| Initial Database Schema | ✅ Completed |
| Authentication | ⏳ Planned |
| Notes CRUD | ⏳ Planned |
| Rich Text Editor | ⏳ Planned |
| Logging | ⏳ Planned |
| Exception Handling | ⏳ Planned |
| Testing | ⏳ Planned |
| SonarQube | ⏳ Planned |

---

# License

This project is developed as part of the **10Pearls SHINE Cohort 9 MERN Assignment**.
