# Task Manager Application

## 🚀 Overview

This is a full-stack Task Manager application built with Node.js, Express, React, and MongoDB. It includes JWT-based authentication, role-based access control, and full CRUD functionality.

---

## 🛠️ Tech Stack

* Backend: Node.js, Express.js
* Frontend: React.js
* Database: MongoDB
* Authentication: JWT (JSON Web Token)
* Password Hashing: bcrypt

---

## Deployments
1. Backend is deployed on render
2. Frontend is deployed on vercel

## ⚙️ Setup Instructions

### Backend

1. Clone the repo
2. Run: npm install
3. Create .env file:
   DATABASE_URL=your_mongodb_uri
   JWT_SECRET=your_secret
5. Run: npm start

### Frontend

1. Navigate to frontend folder
2. Run: npm install
3. Run: npm start

---

## 🔐 Authentication Flow

* User registers → password hashed using bcrypt
* User logs in → JWT token generated
* Token is sent in Authorization header:
  Bearer <token>
* Middleware verifies token for protected routes

---

## 🔄 API Endpoints

### Auth

* POST /api/v1/auth/register
* POST /api/v1/auth/login

### Tasks

* POST /api/v1/tasks
* GET /api/v1/tasks
* GET /api/v1/tasks/:id
* PUT /api/v1/tasks/:id
* DELETE /api/v1/tasks/:id

---

## 🗂️ Database Schema

### User

* id: int
* created_at: TIMESTAMP
* name: VARCHAR
* email: VARCHAR
* password: TEXT
* role: VARCHAR - (DEFAULT 'user')

### Task

* id: INT 
* created_at: TIMESTAMP 
* title: VARCHAR
* description: TEXT
* user_id: INT (References to user)

---

## 🖥️ Frontend

* Login page
* Register page
* Dashboard
* Task CRUD operations
* Protected routes using JWT

---

## 📈 Scalability Notes

### Horizontal Scaling

The application can be scaled by running multiple instances of the backend server.

### Load Balancing

A load balancer (e.g., Nginx) can distribute incoming traffic across multiple servers.

### Microservices Architecture

The system can be split into services such as:

* Auth Service
* Task Service

### Caching using Redis

Frequently accessed data (like tasks) can be cached to improve performance.

### Database Indexing

Indexes can be added on fields like email and userId to improve query speed.

---

## 📘 API Documentation

API is documented using Postman collection including:

* Endpoint details
* Request/response examples
* Authentication usage

---

## 📘 API Documentation Link

https://vamshi07012003-8137647.postman.co/workspace/926e3bb1-6ece-4ff6-8004-aea72d8ed84f/collection/53485012-6bcd8d2c-da09-4a37-ab55-1d1f4c302743?action=share&source=copy-link&creator=53485012

## ⭐ Bonus Features

* Logging using Morgan
* Rate limiting for API protection

---

## Admin Credentials

* email:admin@gmail.com
* password:admin@123
