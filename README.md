DevPulse API
Live URL
https://assigenment-2.vercel.app
GitHub Repository
https://github.com/Mahmudul150/Assigenment---2
Project Overview

DevPulse is a collaborative issue tracking platform for software teams. It allows contributors and maintainers to report bugs, request features, track issue status, and manage software development workflows.

Features
User Registration & Login
JWT Authentication
Role Based Authorization
Create Issue
Get All Issues
Get Single Issue
Update Issue
Delete Issue
PostgreSQL Database
Password Hashing with bcrypt
Raw SQL Queries
Centralized Error Handling
Tech Stack
Node.js
Express.js
TypeScript
PostgreSQL
pg
bcrypt
jsonwebtoken
dotenv
cors
Project Structure
src/
├── app/
│   ├── modules/
│   │   ├── auth/
│   │   └── issue/
│   ├── middleware/
│   ├── utils/
│   └── config/
├── server.ts
└── app.ts
Installation
Clone Repository
git clone https://github.com/your-username/devpulse.git
Install Dependencies
npm install
Create Environment Variables

Create a .env file:

PORT=5000

DATABASE_URL=your_postgresql_connection_string

JWT_SECRET=your_secret_key

BCRYPT_SALT_ROUNDS=10
Run Development Server
npm run dev
Build Project
npm run build
Production
npm start
Database Schema
Users Table
Field	Type
id	SERIAL
name	VARCHAR(50)
email	VARCHAR(100)
password	TEXT
role	VARCHAR(20)
created_at	TIMESTAMP
updated_at	TIMESTAMP
Issues Table
Field	Type
id	SERIAL
title	VARCHAR(150)
description	TEXT
type	VARCHAR(30)
status	VARCHAR(20)
reporter_id	INTEGER
created_at	TIMESTAMP
updated_at	TIMESTAMP
API Endpoints
Authentication
Register User
POST /api/auth/signup
Login User
POST /api/auth/login
Issues
Create Issue
POST /api/issues
Get All Issues
GET /api/issues

Query Parameters

sort=newest
sort=oldest

type=bug
type=feature_request

status=open
status=in_progress
status=resolved
Get Single Issue
GET /api/issues/:id
Update Issue
PATCH /api/issues/:id
Delete Issue
DELETE /api/issues/:id