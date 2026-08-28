# cohort-9-mern-10286-babar

Cohort 9 — MERN (NodeJS + ReactJS) assignment for **Babar Rahim**.

---

# Notes App

A full-stack Notes application built using React.js and Node.js.

This project is being developed as part of the **10Pearls SHINE MERN Internship** using a feature-branch workflow.

---

# Overview

The project includes backend and frontend setup, PostgreSQL integration, Prisma ORM configuration, JWT-based user authentication, Notes CRUD APIs, a Rich Text Editor, Dashboard, Pino Logger, and Global Exception Handling.

## Implemented in this repository

### Project Setup

- Backend project setup
- Frontend project setup
- PostgreSQL database configuration
- Prisma ORM configuration
- Initial database schema
- Database migration setup

### Authentication

- User registration API
- User login API
- JWT authentication
- Protected authentication routes
- Authenticated user identification through JWT

### Notes

- Create note
- Get all notes for the authenticated user
- Get a single note by ID
- Update note
- Delete note
- Notes are associated with the authenticated user

### Rich Text Editor

- Rich text editing support for notes

### Dashboard

- Dashboard for managing and viewing notes

### Logging

- Pino Logger integration
- Application logging for backend operations

### Global Exception Handling

- Centralized error/exception handling
- Consistent error responses for API errors

## Planned for future phases

- Unit Testing (Mocha/Chai & Jest)
- SonarQube Integration

---

# Technology Stack

## Frontend

- React.js
- Vite
- React Router
- Axios
- Rich Text Editor

## Backend

- Node.js
- Express.js
- Prisma ORM
- JWT
- bcrypt
- Pino

## Database

- PostgreSQL
- Prisma ORM

## Code Quality & Testing

- Mocha/Chai
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

```text
http://localhost:5000
```

Health Check

```text
GET /
```

Example Response

```json
{
  "success": true,
  "message": "Notes API is running"
}
```

### Authentication Endpoints

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Notes Endpoints

All Notes endpoints require JWT authentication.

Include the following header in every request:

```text
Authorization: Bearer <token>
```

#### Create Note

```text
POST /api/notes
```

Required JSON fields:

```json
{
  "title": "My first note",
  "content": "This is my first note."
}
```

#### Get All Notes

```text
GET /api/notes
```

Returns all notes belonging to the authenticated user.

#### Get Single Note

```text
GET /api/notes/:id
```

Returns a specific note belonging to the authenticated user.

#### Update Note

```text
PUT /api/notes/:id
```

Required JSON fields:

```json
{
  "title": "Updated title",
  "content": "Updated note content."
}
```

#### Delete Note

```text
DELETE /api/notes/:id
```

Deletes a specific note belonging to the authenticated user.

## Frontend

```bash
cd frontend

npm run dev
```

Frontend runs on

```text
http://localhost:5173
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
| Authentication | ✅ Completed |
| Notes CRUD | ✅ Completed |
| Rich Text Editor | ✅ Completed |
| Dashboard | ✅ Completed |
| Logging | ✅ Completed |
| Exception Handling | ✅ Completed |
| Testing | ✅ Completed |
| SonarQube | ⏳ Pending |

---

# License

This project is developed as part of the **10Pearls SHINE Cohort 9 MERN Assignment**.
