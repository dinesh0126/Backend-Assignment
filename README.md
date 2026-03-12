# Project Management API

Production-ready Node.js + Express REST API with JWT authentication and multi-tenant project management.

## Features
- JWT-based auth (register/login)
- Tenant creation flow
- Project CRUD with tenant + owner scoping
- Input validation with Joi
- Modular architecture (routes/controllers/services)
- API versioning (`/api/v1`)

## Requirements
- Node.js 18+
- MongoDB instance

## Setup
1. Install dependencies:
   `npm install`
2. Create `.env` and set values (only `.env` is used).
3. Run locally:
   `npm run dev`

## Flow (What to call first)
1. Create tenant (company)
   - `POST /api/v1/tenants`
   - body: `{ "name": "Acme Corp" }`
   - Response gives `tenant.id`
2. Register user
   - `POST /api/v1/auth/register`
   - body: `{ "name": "", "email": "", "password": "", "tenantId": "<tenant.id>" }`
   - Response gives JWT token
3. Use token for projects
   - `Authorization: Bearer <token>`

## API Endpoints

### Tenants
- `POST /api/v1/tenants`
  - body: `{ "name": "Acme Corp" }`

### Auth
- `POST /api/v1/auth/register`
  - body: `{ "name": "", "email": "", "password": "", "tenantId": "" }`
- `POST /api/v1/auth/login`
  - body: `{ "email": "", "password": "" }`

### Projects (Bearer token required)
- `POST /api/v1/projects`
- `GET /api/v1/projects`
- `GET /api/v1/projects/:id`
- `PUT /api/v1/projects/:id`
- `DELETE /api/v1/projects/:id`

## Deployment (Render)
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables (set in Render dashboard):
  - `MONGODB_URI` (MongoDB Atlas URL)
  - `JWT_SECRET` (strong random string)
  - `JWT_EXPIRES_IN` (e.g., `1d`)
  - `NODE_ENV=production`

A `render.yaml` is included for quick setup.

## Notes
- Users can only access their own projects within their tenant.
