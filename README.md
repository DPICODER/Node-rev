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
* Default scopes for hiding sensitive fields
* Model hooks for automatic password hashing
* Instance methods (e.g., password comparison)

### Authentication Foundations

* Register & login flow design
* Secure password hashing with bcrypt
* Scoped database queries
* Controller/route separation

### Middleware System

* Request logging middleware
* Error middleware pipeline
* Clean middleware ordering
* Express architecture fundamentals

### Code Structure Improvements

* Separation of concerns (routes → controllers → models)
* Simplified readable logic
* Avoiding cluttered monolithic files
* Professional folder architecture

---

## 📁 Project Structure

```
src/
├── controllers/     # Business logic
├── models/          # Database schemas & hooks
├── routes/          # API endpoints
├── middlewares/     # Logging & error handling
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

### Phase 1 — Authentication (In Progress)

* User model
* Password hashing hooks
* Register endpoint
* Login endpoint
* JWT authentication (coming next)

---

## 🛠 Tech Stack

* Node.js
* Express.js
* Sequelize ORM
* MariaDB
* bcrypt
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

* JWT authentication
* Route protection middleware
* Role-based authorization
* Input validation
* Automated testing
* Production-ready patterns

---

## 📖 Notes

This repo is intentionally documented to track learning progress and reinforce backend engineering concepts. It serves as both a revision guide and a growing backend reference.

---

## ⚡ Author
SAIVARUN aka DPICODER
Backend revision & experimentation lab focused on mastering Node.js architecture.

