# System Architecture — CampusEats

## 1. High-Level Architecture

The system follows a three-tier architecture deployed on Railway cloud platform.

Client Layer: React 18 SPA built with Vite. Served as static files via Nginx.
Gateway Layer: Nginx reverse proxy. Routes /api/* to Node.js backend.
Application Layer: Node.js + Express. Handles JWT auth, business logic, database queries.
Data Layer: PostgreSQL stores all persistent data.

## 2. Docker Compose Services

| Service | Image | Port | Role |
|---------|-------|------|------|
| db | postgres:16-alpine | 5432 | Database |
| app | custom (Dockerfile) | 5000 | Backend API + Frontend |
| nginx | nginx:1.25-alpine | 80 | Reverse Proxy |

## 3. Dockerfile Multi-Stage Build

Stage 1 (frontend-builder): Uses node:18-alpine to compile React SPA with Vite.
Stage 2 (production): Copies backend and built frontend. Runs as non-root user. Includes HEALTHCHECK.

## 4. API Routes

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register new user |
| POST | /api/auth/login | No | Login and get JWT |
| GET | /api/menus | No | Get all menu items |
| POST | /api/menus | Admin | Create menu item |
| GET | /api/orders | User | Get user orders |
| GET | /api/orders/all | Admin | Get all orders |
| POST | /api/orders | User | Place new order |
| PUT | /api/orders/:id | Admin | Update order status |
| GET | /api/cart | User | Get cart items |
| POST | /api/cart | User | Add item to cart |
| DELETE | /api/cart/:id | User | Remove cart item |
| GET | /api/health | No | Health check |

## 5. Scalability

Horizontal: Stateless JWT allows multiple Node.js instances behind a load balancer.
Vertical: Railway supports upgrading instance tiers without code changes.
Database: Index on orders.user_id improves query performance as data grows.

## 6. Resilience Measures

| Measure | Implementation |
|---------|---------------|
| Health check | GET /api/health + Docker HEALTHCHECK |
| Auto-restart | restart: unless-stopped in docker-compose.yml |
| DB readiness | depends_on: db: condition: service_healthy |
| Non-root user | USER appuser in Dockerfile |
| Uptime monitoring | UptimeRobot pings /api/health every 5 minutes |
| Rate limiting | express-rate-limit on all /api/ routes |
