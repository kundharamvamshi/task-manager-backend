# ⚙️ Task Manager Backend

A RESTful API built using Node.js and Express for managing user authentication and task operations. The backend is connected to a PostgreSQL database (Supabase) and deployed on Render.

---

## 🚀 Features

* 🔐 JWT Authentication (Login/Register)
* 📋 CRUD Operations for Tasks
* 🔒 Protected Routes using Middleware
* 🧑‍💼 Role-based Access (User/Admin)
* 🌐 Deployed API with cloud database

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* PostgreSQL (Supabase)
* JWT (jsonwebtoken)
* bcrypt (password hashing)

---

## 📦 Installation & Setup

```bash
npm install
npm start
```

---

## 🌐 Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_supabase_url
JWT_SECRET=your_secret_key
```

---

## 🔐 Authentication

* JWT token is generated on login
* Token must be sent in headers:

---  
---
---

