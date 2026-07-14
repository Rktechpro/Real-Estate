# 🏠 Real Estate Management System

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/Node.js-22-339933?logo=node.js" />
  <img src="https://img.shields.io/badge/Express.js-5-black?logo=express" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" />
  <img src="https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb" />
  <img src="https://img.shields.io/badge/Redis-Queue-red?logo=redis" />
  <img src="https://img.shields.io/badge/Docker-Container-blue?logo=docker" />
</p>

A full-stack **Real Estate Management System** built with **Next.js**, **Node.js**, **Express**, **MongoDB**, **Redis**, **BullMQ**, **Docker**, and **TypeScript**.

---

# 📖 Overview

This application provides a modern platform for managing real estate properties.

The project is divided into two applications:

- 🖥 Frontend (Next.js)
- ⚙ Backend (Express.js API)

Both applications are containerized using Docker Compose.

---

# 🚀 Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
- React Hook Form

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Redis
- BullMQ
- JWT Authentication

## DevOps

- Docker
- Docker Compose

---

# 📂 Project Structure

```text
real-estate/

│
├── frontend/
│   │
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── hooks/
│   ├── types/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
│
├── backend/
│   │
│   ├── src/
│   │
│   ├── auth/
│   ├── addProperty/
│   ├── config/
│   ├── queues/
│   ├── upload/
│   ├── message-template/
│   ├── types/
│   └── main.ts
│
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

# 🏗 Architecture

```
                   Browser
                      │
                      ▼
                Next.js Frontend
                      │
          REST API (Axios / Fetch)
                      │
                      ▼
              Express Backend API
                      │
          ┌───────────┴────────────┐
          ▼                        ▼
      MongoDB                  Redis
          │                        │
          ▼                        ▼
      Database                BullMQ Worker
```

---

# 🎨 Frontend Architecture

The frontend follows a component-based architecture using Next.js App Router.

```
app/
│
├── (auth)
├── dashboard
├── properties
├── profile
└── layout.tsx
```

### Frontend Features

- Authentication
- Property Listing
- Property Details
- Property Management
- Responsive UI
- API Integration
- Route Protection
- Loading States
- Error Handling

---

# ⚙ Backend Architecture

The backend follows a **Feature-Based Modular Architecture**.

```
Feature

├── Controller
├── Service
├── Model
├── DTO
├── Interface
├── Route
├── Middleware
└── Worker
```

---

# 🔄 Application Flow

```
User
 │
 ▼
Next.js Frontend
 │
 ▼
Axios API Call
 │
 ▼
Express Route
 │
 ▼
Controller
 │
 ▼
Service
 │
 ▼
MongoDB
 │
 ▼
Response
 │
 ▼
Frontend UI
```

---

# 🐳 Docker Services

| Service  | Port |
| -------- | ---- |
| Frontend | 3000 |
| Backend  | 4000 |
| Redis    | 6379 |

---

# ▶ Running the Project

## Build Containers

```bash
docker compose build
```

## Start

```bash
docker compose up
```

## Detached Mode

```bash
docker compose up -d
```

## Stop

```bash
docker compose down
```

---

# 🌐 Application URLs

Frontend

```
http://localhost:3000
```

Backend

```
http://localhost:4000
```

Redis

```
localhost:6379
```

---

# 📦 Features

## Frontend

- Next.js App Router
- Responsive UI
- Authentication Pages
- Dashboard
- Property Management
- API Integration
- Form Validation
- Protected Routes

## Backend

- JWT Authentication
- Property CRUD
- MongoDB
- Redis
- BullMQ
- Background Workers
- Docker
- TypeScript

---

# 📈 Future Improvements

- Google Login
- Email Verification
- Image Upload (AWS S3)
- Notifications
- Payment Integration
- Admin Dashboard
- Swagger Documentation
- Unit Testing
- CI/CD Pipeline
- Kubernetes Deployment

---

# 👨‍💻 Author

**Ravi Kumar**

Full Stack MERN Developer

### Technologies

- Next.js
- React
- Node.js
- Express.js
- TypeScript
- MongoDB
- Redis
- Docker

---

⭐ If you like this project, don't forget to give it a star on GitHub!
