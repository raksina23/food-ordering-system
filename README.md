# Campus food-ordering-system
A web-based food ordering platform for Prince of Songkla University (Phuket Campus),
built as part of the 977-364 Software Deployment and Maintenance course.

Students and staff can browse restaurant menus, add items to a cart, place orders,
and track order status in real time. Restaurant administrators manage menus and
update order statuses through a dedicated admin dashboard.

## Team Members
1.Kittitouch Saeong  : Project Manager
2.Patsa Chankol      : Lead Developer
3.Raksina Kongjua    : DevOps / Cloud Engineer + Release Manager

## Tech Stack
Frontend : React 18 + Vite
Backend  : Node.js + Express
Database : PostgreSQL
Authentication : JWT + bcrypt
Containerization : Docker + Compose
Reverse Proxy : Nginx
CI/CD : GitHub Actions
Cloud Platform : Railway
Version Control : Git + GitHub

## Features

1. **User Management** — register, login, update profile, delete account
2. **Menu Management** — admin CRUD on food items, categories, prices
3. **Order Management** — place, view, update status, cancel orders
4. **Cart Management** — add, view, update quantity, remove items
5. **Review & Rating** — submit, view, edit, delete reviews on menu items


## Project Structure
food-ordering-system/
├── src/
│   ├── frontend/          # React 18 + Vite application
│   └── backend/           # Node.js + Express REST API
├── tests/                 # Jest unit and integration tests
├── docs/
│   ├── architecture.md    # System architecture and diagrams
│   ├── deployment-guide.md
│   ├── change-requests/   # Formal change request documents
│   └── progress-logs/     # Iteration 1–3 progress logs
├── .github/workflows/     # GitHub Actions CI/CD pipelines
├── Dockerfile             # Multi-stage build (React + Express + Nginx)
├── docker-compose.yml     # Multi-service: app, PostgreSQL, Nginx
├── CHANGELOG.md
└── README.md

## Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose

### Run with Docker
```bash
docker compose up --build
```

### Run locally

```bash
# Backend
cd src/backend
npm install
npm run dev

# Frontend (new terminal)
cd src/frontend
npm install
npm run dev
```

## Architecture

Three-tier architecture:
- **Client Layer** — React SPA served as static files via Nginx
- **Gateway Layer** — Nginx reverse proxy routing `/api/*` to Express
- **Application Layer** — Node.js + Express (JWT auth, business logic)
- **Data Layer** — PostgreSQL (users, orders, menu items, reviews)

See `docs/architecture.md` for full architecture diagram and database schema.

## Branching Strategy

GitHub Flow:
- `main` — production only, branch protection enabled
- `develop` — integration branch, all features merge here first  
- `feature/*` — individual feature branches (e.g. `feature/user-auth`)
- `fix/*` — bug fix branches (e.g. `fix/cart-quantity-bug`)

## Third-Party Credits

- [Express](https://expressjs.com/) — MIT License
- [React](https://react.dev/) — MIT License
- [PostgreSQL](https://www.postgresql.org/) — PostgreSQL License
- [Nginx](https://nginx.org/) — BSD License
- [JWT](https://github.com/auth0/node-jsonwebtoken) — MIT License
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) — MIT License