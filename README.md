# Node Rev — Backend Revision & Learning Lab

A personal backend engineering lab focused on revising Node.js fundamentals and learning production-style backend architecture step by step.

This repository is not a single app — it is a **structured backend learning workspace** where each phase builds real engineering skills through hands-on implementation.

---

## 🎯 Purpose

The goal of this repo is to:

* Revisit backend fundamentals with Node.js & Express
* Learn real-world backend architecture patterns
* Build clean, maintainable API structure
* Practice production-grade security techniques
* Replace cluttered beginner code with scalable design patterns

This project emphasizes **architecture and engineering discipline**, not just making things work.

---

## 🧠 Key Concepts Learned So Far

### Error & Security Architecture

* Centralized global error handling middleware
* Custom structured error classes (AppError pattern)
* Async error propagation without try/catch clutter
* Consistent API error response format
* Helmet security headers integration
* Global and route-specific rate limiting
* Joi validation with input sanitization
* Standardized HTTP status code usage
* Global 404 handling pipeline

### Sequelize Model Design

* Proper schema design
* Model associations (User ↔ Asset ↔ Allocation relationships)
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

### Allocation System Architecture

* Transaction-safe asset assignment
* Row-level locking to prevent race conditions
* Asset lifecycle state management
* Allocation history tracking
* Relational joins with eager loading
* Input validation middleware
* Business rule enforcement
* Atomic multi-table updates

### Audit Logging System

* Dedicated audit log model
* Middleware-driven action tracking
* Authentication event logging
* Asset and allocation event logging
* Admin-only audit viewing endpoint

### Middleware System

* Authentication middleware
* Role-based authorization middleware
* Validation middleware pipeline
* Audit logging middleware
* Rate limiting middleware
* Centralized error middleware
* Clean middleware ordering

### API Query Engine

* Pagination using limit/offset
* Dynamic filtering system
* Safe sorting architecture
* Scalable query composition
* Joined relational queries

### Code Structure Improvements

* Separation of concerns (routes → controllers → models)
* Modular controller architecture
* Professional folder organization
* Readable and maintainable logic

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
* Full CRUD endpoints
* Admin authorization rules
* Joi input validation
* Pagination, filtering & sorting

### Phase 3 — Allocation System ✅

* Allocation model/schema
* Transaction-safe asset assignment
* Asset lifecycle management
* Allocation history tracking
* Concurrency-safe business logic

### Phase 4 — Audit Logging System ✅

* AuditLog model/schema
* Middleware-driven audit logging
* Authentication event tracking
* Asset & allocation logging
* Admin audit log endpoint

### Phase 5 — Error Handling & Security ✅

* Centralized global error handler
* Custom error classes
* Helmet security middleware
* Global & route-specific rate limiting
* Async error handling wrapper
* Joi input sanitization
* Standardized HTTP status codes

---

## 🛠 Tech Stack

* Node.js
* Express.js
* Sequelize ORM
* MariaDB
* bcrypt
* JWT
* Joi
* Helmet
* express-rate-limit
* dotenv

---

## 📌 Learning Philosophy

This repository follows:

* **Incremental learning**
* **Architecture-first thinking**
* **Security-conscious design**
* **Production-style engineering practices**
* **Readable, maintainable code**

Each phase focuses on mastering one layer of backend engineering before advancing.

---

## 🔜 Next Steps (Phase 6 Preview)

* Automated API testing with Jest & Supertest
* Test database isolation
* Integration test coverage for auth & assets
* Service-layer architecture exploration
* API documentation (OpenAPI/Swagger)

---

## 📖 Notes

This repo is intentionally documented to track learning progress and reinforce backend engineering concepts. It serves as both a revision guide and a growing backend reference.

---

## ⚡ Author

**SAIVARUN (DPICODER)**
Backend engineering revision lab focused on mastering Node.js architecture.
