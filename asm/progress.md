# PROGRESS

## Phase 0 — Project Setup (Foundation)

* [X] Initialize Node project (npm init)
* [X] Install core dependencies (express, dotenv, bcrypt, jwt, cors, helmet)
* [X] Install dev dependencies (nodemon, jest/supertest)
* [X] Create folder architecture
* [X] Setup Express server entry point
* [X] Setup environment variables (.env)
* [X] Connect database successfully => sequelize auth connect
* [X] Create base error handler middleware => handles every single error thrown as throw new Error("error message")
* [X] Add request logging middleware => logs every requrest type URL and time took to respond

---

## Phase 1 — Authentication System

* [X] Create User model/schema
* [X] Implement password hashing
* [X] Create register endpoint
* [X] Create login endpoint
* [X] Generate JWT tokens
* [X] Create auth middleware (protect routes)
* [X] Create /auth/me endpoint
* [X] Add role-based authorization middleware
* [X] Validate inputs using Joi/Zod
* [X] Test auth endpoints with Postman

---

## Phase 2 — Asset CRUD System

* [X] Create Asset model/schema
* [X] Implement create asset endpoint
* [X] Implement get all assets endpoint
* [X] Implement get asset by ID endpoint
* [X] Implement update asset endpoint
* [X] Implement delete asset endpoint
* [X] Restrict create/delete to admin role
* [X] Add input validation -> Used joi validator
* [X] Add pagination support
* [X] Add filtering (category/status)
* [X] Add sorting options

---

## Phase 3 — Allocation System

* [X] Create Allocation model/schema
* [X] Create assign asset endpoint
* [X] Prevent assigning unavailable assets
* [X] Create return asset endpoint
* [X] Update asset status automatically
* [X] Track allocation history
* [X] Create endpoint to list allocations
* [X] Validate all allocation inputs

---

## Phase 4 — Audit Logging System

* [X] Create AuditLog model/schema
* [X] Build audit logging middleware/service
* [X] Log asset creation actions
* [X] Log allocation actions
* [X] Log user authentication events
* [X] Create endpoint to view audit logs (admin only)

---

## Phase 5 — Error Handling & Security

* [X] Centralized error handler working globally
* [X] Custom error classes (optional)
* [X] Add Helmet security middleware
* [X] Add rate limiting middleware
* [X] Handle async errors properly
* [X] Sanitize inputs
* [X] Proper HTTP status codes everywhere

---

## Phase 6 — Testing

* [ ] Setup Jest/Supertest
* [ ] Write test for auth register/login
* [ ] Write test for asset CRUD
* [ ] Write test for allocation logic
* [ ] Write test for role permissions
* [ ] Run full test suite successfully

---

## Phase 7 — Documentation

* [ ] Write README with setup instructions
* [ ] Document all API endpoints
* [ ] Add example request/response formats
* [ ] Add Swagger documentation (optional)

---

## Phase 8 — Deployment

* [ ] Prepare production environment variables
* [ ] Deploy to cloud (Render/Railway/VPS/etc.)
* [ ] Test live endpoints
* [ ] Fix deployment issues
* [ ] Share working API URL
