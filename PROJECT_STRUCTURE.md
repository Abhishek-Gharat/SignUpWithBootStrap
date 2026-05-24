# Project Structure

## Overview
This project is a full-stack email application:

- `backend/`: Node.js + Express API with PostgreSQL
- `react-bootstrap-auth/`: React frontend with React Bootstrap

## Folder Structure

```text
C:\Users\ASUS\SignUpbootstrap
|-- backend/
|   |-- routes/
|   |   |-- auth.js              # Signup and login routes
|   |   `-- mail.js              # Mail, sent, inbox, trash routes
|   |-- checkDb.js               # Database check helper
|   |-- db.js                    # PostgreSQL connection pool
|   |-- initDb.js                # Creates required tables and indexes
|   |-- insertDummyData.js       # Test data helper
|   |-- server.js                # Express server entry point
|   |-- testQuery.js             # Query test helper
|   |-- updateTable.js           # Adds trash columns to existing mails table
|   |-- package.json
|   `-- .env                     # Local environment variables
|
|-- react-bootstrap-auth/
|   |-- public/
|   |   |-- index.html
|   |   |-- manifest.json
|   |   `-- robots.txt
|   |-- src/
|   |   |-- components/
|   |   |   |-- ComposeMail.jsx
|   |   |   |-- CustomQuill.jsx
|   |   |   |-- Inbox.jsx
|   |   |   |-- Login.jsx
|   |   |   |-- MessageDetails.jsx
|   |   |   |-- Sent.jsx
|   |   |   |-- Signup.jsx
|   |   |   |-- Trash.jsx
|   |   |   `-- Welcome.jsx
|   |   |-- reducers/
|   |   |   `-- mailReducer.js
|   |   |-- api.js               # Axios API client
|   |   |-- App.js               # React routes
|   |   `-- index.js             # React entry point
|   |-- package.json
|   `-- README.md
|
|-- FEATURES.md
|-- FIXES_APPLIED.md
`-- PROJECT_STRUCTURE.md
```

## Backend API

### Authentication Routes

```text
POST /api/auth/signup
POST /api/auth/login
```

### Mail Routes

```text
POST   /api/mail/send
GET    /api/mail/inbox/:email
GET    /api/mail/sent/:email
GET    /api/mail/trash/:email
PUT    /api/mail/read/:id
PUT    /api/mail/trash/:id
PUT    /api/mail/restore/:id
DELETE /api/mail/delete/:id
DELETE /api/mail/permanent/:id
```

## Database Tables

### users

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### mails

```sql
CREATE TABLE mails (
  id SERIAL PRIMARY KEY,
  sender VARCHAR(255) NOT NULL,
  receiver VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  read BOOLEAN DEFAULT false,
  trashed BOOLEAN DEFAULT false,
  trashed_at TIMESTAMP DEFAULT NULL
);
```

## Run Order

1. Start PostgreSQL and make sure the `authapp` database exists.
2. From `backend/`, run `node initDb.js` once to create tables.
3. From `backend/`, run `npm start`.
4. From `react-bootstrap-auth/`, run `npm start`.

The frontend API client expects the backend at `http://localhost:5000/api`.
