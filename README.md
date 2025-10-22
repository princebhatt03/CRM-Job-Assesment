# Full-Stack CRM Web Application

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Architecture](#architecture)
- [Database Design](#database-design)
- [API Endpoints](#api-endpoints)
- [Frontend Features](#frontend-features)
- [Authentication & Security](#authentication--security)
- [Email Functionality](#email-functionality)
- [Testing](#testing)
- [Docker Setup & Deployment](#docker-setup--deployment)
- [Environment Variables](#environment-variables)
- [Default Credentials](#default-credentials)
- [Screen Recording](#screen-recording)
- [Notes & Assumptions](#notes--assumptions)

---

## Project Overview
This project is a **multi-organization CRM web application** that allows admins to manage customers and organizations efficiently. It also exposes authenticated APIs for external integrations. The app is fully dockerized and ready for deployment.

---

## Tech Stack
- **Backend:** ExpressJS (Node.js)  
- **Frontend:** ReactJS  
- **Database:** PostgreSQL  
- **Containerization:** Docker & Docker Compose  
- **Authentication:** JWT (Admins/Super-admins)  
- **Email Service:** SMTP / Mock email service (console log)  

---

## Features

### Multi-Organization Support
- Super-admin can create, edit, delete organizations and admin users.
- Org-admins can manage customers only within their organization.

### CRUD Operations
- Full CRUD for **Customers**, **Admins**, and **Organizations**.
- Accessible via **frontend UI** and **backend REST API**.

### Authentication & Authorization
- Admin login/logout with JWT-based authentication.
- Role-based access control:
  - **Super-admin:** Full access.
  - **Org-admin:** Scoped to own organization.
  - **Unauthenticated users:** No access.

### External API Integration
- Authenticated API endpoints for CRUD operations on customers.
- API Key management for external integrations.
- Supports Bearer token and X-API-Key authentication.

### Email Notifications
- Emails triggered for key events:
  - Customer registration: greeting email + admin notification.
  - Device verification.
- Email templates stored in `/templates`.

---

## Architecture
Frontend (ReactJS) <--> Backend (ExpressJS) <--> PostgreSQL
| |
+------ Dockerized (Docker Compose) ------+

---

## Database Design

### admins
| Field          | Type   | Description |
|----------------|--------|-------------|
| id             | PK     | Unique ID |
| name           | String | Admin name |
| email          | String | Login email |
| password_hash  | String | Encrypted password |
| org_id         | FK     | Organization ID |
| role           | Enum   | superadmin/admin |

### customers
| Field      | Type   | Description |
|------------|--------|-------------|
| id         | PK     | Unique customer ID |
| uid        | String | Unique identifier |
| device_id  | String | Customer device ID |
| org_id     | FK     | Organization ID |
| name       | String | Customer name |
| email      | String | Customer email (optional) |

### orgs
| Field      | Type      | Description |
|------------|-----------|-------------|
| id         | PK        | Organization ID |
| name       | String    | Organization name |
| created_at | Timestamp | Creation date |
| updated_at | Timestamp | Last update |

---

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` – Login (Admin/Super-admin)
- `POST /api/v1/auth/refresh` – Refresh JWT
- `POST /api/v1/auth/logout` – Logout

### Organizations
- `POST /api/v1/orgs` – Create org
- `GET /api/v1/orgs` – List orgs
- `GET /api/v1/orgs/{orgId}` – Get org details
- `PATCH /api/v1/orgs/{orgId}` – Update org
- `DELETE /api/v1/orgs/{orgId}` – Delete org

### Admin Users
- `POST /api/v1/orgs/{orgId}/admins`
- `GET /api/v1/orgs/{orgId}/admins`
- `PATCH /api/v1/orgs/{orgId}/admins/{adminId}`
- `DELETE /api/v1/orgs/{orgId}/admins/{adminId}`

### Customers
- `POST /api/v1/orgs/{orgId}/customers`
- `GET /api/v1/orgs/{orgId}/customers`
- `GET /api/v1/orgs/{orgId}/customers/{customerId}`
- `PATCH /api/v1/orgs/{orgId}/customers/{customerId}`
- `DELETE /api/v1/orgs/{orgId}/customers/{customerId}`

### Device Verification & Events
- `POST /api/v1/orgs/{orgId}/customers/{customerId}/devices/verify`
- `POST /api/v1/orgs/{orgId}/events/customer-registered`

### API Key Management
- `POST /api/v1/orgs/{orgId}/api-keys`
- `GET /api/v1/orgs/{orgId}/api-keys`
- `DELETE /api/v1/orgs/{orgId}/api-keys/{apiKeyId}`

---

## Frontend Features
- Admin login/logout
- Dashboard to list customers
- Forms to add, edit, delete customers
- Search bar and optional pagination
- Proper form validation & error handling

---

## Authentication & Security
- Passwords hashed using **bcrypt**
- JWT expiry: 15–60 minutes with refresh route
- API keys are long, random, and hashed at rest
- Org scoping enforced on all queries
- Protected routes return standard error format:
```json
{ "error": { "code": "RESOURCE_NOT_FOUND", "message": "..." } }
Email Functionality
```
Greeting email on new customer registration

Admin notification on customer registration

Device verification email

Templates located in /templates (plain text or HTML)

Testing

Unit and integration tests for CRUD operations

Authentication tests for protected routes

Recommended frameworks: Jest (Node.js), Supertest (API)

Docker Setup & Deployment
```
# Build & run application
docker-compose up --build
```
Backend, frontend, and PostgreSQL fully dockerized

App auto-creates tables and a default super-admin account

Environment Variables
```env
Example .env.example:

PORT=5000
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=crm
JWT_SECRET=supersecretkey
JWT_EXPIRY=3600
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password
```
### 👨‍💻 Developer
Prince Bhatt

📧 Email: princebhatt316@gmail.com

🌐 Portfolio: [Prince Bhatt](https://princebhatt03.github.io/Portfolio)

💼 GitHub: [princebhatt03](https://github.com/princebhatt03)

💬 LinkedIn: [Prince Bhatt](https://www.linkedin.com/in/prince-bhatt-0958a725a/)

📄 License

This project is created and owned by Prince Bhatt

✨Thank you for connecting...
