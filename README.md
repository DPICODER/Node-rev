# Node Rev — Backend Revision & Learning Lab

A personal backend engineering lab focused on revising Node.js fundamentals and learning production-style backend architecture step by step.

This repository is not a single app — it is a **structured learning workspace** where each phase builds real backend skills through hands-on implementation.

---

## 🎯 Purpose

The goal of this repo is to:

* Revisit backend fundamentals with Node.js & Express
* Learn real-world backend architecture patterns
* Build clean, maintainable API structure
* Practice security best practices
* Replace cluttered beginner code with simplified, scalable patterns

This project emphasizes **understanding architecture**, not just making things work.

---

## 🧠 Key Concepts Learned So Far

### Error Handling Architecture

* Centralized error middleware
* Throwing structured errors with status codes
* Clean error propagation using `next(error)`
* Consistent API error responses

### Sequelize Model Design

* Proper schema design
* Model associations (User ↔ Asset relationships)
* Scoped queries and relational integrity
* Instance-level CRUD operations

### Authentication System

* User registration & login flow
* Secure password hashing with bcrypt hooks
* JWT-based authentication
* Protected routes using auth middleware
* `/auth/me` endpoint for session validation

### Asset CRUD Architecture

* Full Asset CRUD implementation
* Role-based admin authorization
* Joi schema validation pipeline
* Pagination engine with metadata responses
* Filtering by category/status
* Sorting with safe field whitelisting
* Controller-driven REST design

### Middleware System

* Authentication middleware
* Role-based authorization middleware
* Joi validation middleware pipeline
* Centralized error middleware
* Clean middleware ordering

### API Query Engine

* Pagination using limit/offset
* Dynamic filtering system
* Safe sorting architecture
* Scalable query composition

### Code Structure Improvements

* Separation of concerns (routes → controllers → models)
* Modular controller architecture
* Simplified readable logic
* Professional folder architecture

---

## 📁 Project Structure

```
src/
├── controllers/     # Business logic
├── models/          # Database schemas & associations
├── routes/          # API endpoints
├── middlewares/     # Auth, validation & error handling
├── validators/      # Joi validation schemas
├── config/          # Database configuration
└── app.js           # Server entry point
```

---

## 🚀 Current Progress

### Phase 0 — Backend Foundation ✅

* Express server setup
* Database connection
* Error middleware
* Request logging middleware
* Clean folder architecture

### Phase 1 — Authentication System ✅

* User model & schema
* Password hashing hooks
* Register endpoint
* Login endpoint
* JWT authentication
* Route protection middleware
* `/auth/me` endpoint

### Phase 2 — Asset CRUD System ✅

* Asset model & associations
* Create asset endpoint
* Get all assets endpoint
* Get asset by ID endpoint
* Update asset endpoint
* Delete asset endpoint
* Admin-only create/delete enforcement
* Joi input validation
* Pagination support
* Filtering (category/status)
* Sorting options

### Phase 3 — Allocation System (Starting Next)

* Allocation model/schema
* Asset assignment endpoint
* Allocation history tracking
* Business rule enforcement

---

## 🛠 Tech Stack

* Node.js
* Express.js
* Sequelize ORM
* MariaDB
* bcrypt
* JWT
* Joi
* dotenv

---

## 📌 Learning Philosophy

This repository follows:

* **Incremental learning**
* **Architecture-first thinking**
* **Security-conscious design**
* **Readable, maintainable code**

Each phase focuses on mastering one layer of backend engineering before moving forward.

---

## 🔜 Next Steps

* Allocation system design
* Relational domain modeling
* Advanced business logic enforcement
* Automated testing
* Production-ready API patterns

---

## 📖 Notes

This repo is intentionally documented to track learning progress and reinforce backend engineering concepts. It serves as both a revision guide and a growing backend reference.

---

## ⚡ Author

SAIVARUN aka DPICODER
Backend revision & experimentation lab focused on mastering Node.js architecture.
