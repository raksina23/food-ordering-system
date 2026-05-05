# Deployment Guide — CampusEats

This guide explains how to deploy the CampusEats application from scratch, both locally using Docker and on Railway (cloud platform).

---

## Prerequisites

- [Node.js 18+](https://nodejs.org/)
- [Docker](https://www.docker.com/) and Docker Compose
- [Git](https://git-scm.com/)
- A [Railway](https://railway.app/) account (for cloud deployment)
- A [GitHub](https://github.com/) account

---

## 1. Clone the Repository

```bash
git clone https://github.com/raksina23/food-ordering-system.git
cd food-ordering-system
```

---

## 2. Environment Variables

Copy the example env file and fill in your values:

```bash
cp src/backend/.env.example src/backend/.env
```

Edit `src/backend/.env`:

```env
PORT=5000
JWT_SECRET=your_secret_key_here
DB_HOST=localhost
DB_PORT=5432
DB_NAME=campuseats
DB_USER=postgres
DB_PASSWORD=your_password_here
```

---

## 3. Local Development (Without Docker)

### 3.1 Install Dependencies

```bash
# Backend
npm install --prefix src/backend

# Frontend
npm install --prefix src/frontend
```

### 3.2 Set Up PostgreSQL

Make sure PostgreSQL is running locally, then create the database and tables:

```bash
psql -U postgres -c "CREATE DATABASE campuseats;"
psql -U postgres -d campuseats -f src/backend/config/init.sql
```

### 3.3 Run the Application

**Terminal 1 — Backend:**
```bash
npm start
```

**Terminal 2 — Frontend:**
```bash
cd src/frontend
npm run dev
```

Access the app at `http://localhost:5173` (frontend) and `http://localhost:5000` (API).

---

## 4. Local Deployment with Docker Compose

### 4.1 Build and Start All Services

```bash
docker compose up --build
```

This starts 3 services:
- **db** — PostgreSQL 16 (initializes with `init.sql` automatically)
- **app** — Node.js + Express backend (serves built frontend at port 5000)
- **nginx** — Reverse proxy (port 80 → app:5000)

### 4.2 Access the Application

Open `http://localhost` in your browser.

### 4.3 Stop the Application

```bash
docker compose down
```

To also remove the database volume:
```bash
docker compose down -v
```

---

## 5. Cloud Deployment on Railway

### 5.1 Connect GitHub Repository

1. Log in to [Railway](https://railway.app/)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select `food-ordering-system`

### 5.2 Add PostgreSQL Database

1. In the Railway project, click **"+ New"** → **"Database"** → **"Add PostgreSQL"**
2. Railway will create a PostgreSQL instance automatically

### 5.3 Initialize the Database

1. Go to **Postgres** → **Database** → **Data**
2. Paste and run the contents of `src/backend/config/init.sql` in the query box

### 5.4 Set Environment Variables

Go to your app service → **Variables** and add:

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `JWT_SECRET` | your secret key |
| `DATABASE_URL` | (auto-set by Railway Postgres) |

### 5.5 Configure Build and Start Commands

Railway uses the `railway.json` at the project root:

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install --prefix src/frontend && npm run build --prefix src/frontend && cp -r src/frontend/dist src/backend/public"
  },
  "deploy": {
    "startCommand": "node src/backend/server.js"
  }
}
```

### 5.6 Deploy

Railway deploys automatically on every push to `main`. To trigger manually:

Go to **Deployments** → click **⋮** → **Redeploy**

### 5.7 Verify Deployment

Check the health endpoint:
```
https://your-app.up.railway.app/api/health
```

Expected response:
```json
{ "status": "ok", "message": "CampusEats API is running!" }
```

---

## 6. CI/CD Pipeline (GitHub Actions)

The pipeline runs automatically on every push or PR to `main` or `develop`.

**Pipeline stages:**

| Stage | Trigger | Description |
|-------|---------|-------------|
| Lint | Every push/PR | Installs dependencies and checks for errors |
| Test | After lint | Runs Jest tests with a temporary PostgreSQL service |
| Build | Merge to main only | Builds Docker image and tests `/api/health` endpoint |

Pipeline config: `.github/workflows/ci-cd.yml`

---

## 7. Setting Up an Admin Account

1. Register a new account through the web UI
2. Go to Railway → **Postgres** → **Database** → **Data**
3. Run this query (replace with your email):

```sql
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

4. Log out and log back in — you will now see the **Admin** panel in the navbar

---

## 8. Health Check

The application exposes a health endpoint at `/api/health`:

```bash
curl https://your-app.up.railway.app/api/health
```

Response:
```json
{ "status": "ok", "message": "CampusEats API is running!" }
```

This endpoint is used by Docker's `HEALTHCHECK` instruction and can be monitored by uptime services such as UptimeRobot.

---

## 9. Troubleshooting

| Problem | Solution |
|---------|----------|
| `ENOENT: public/index.html` | Frontend not built. Run build command before starting backend. |
| `password authentication failed` | Check `DB_PASSWORD` in `.env` matches your PostgreSQL password. |
| `EADDRINUSE: port 5000` | Another process is using port 5000. Kill it with `taskkill /PID <pid> /F` (Windows) or `kill -9 <pid>` (Linux/Mac). |
| `Failed to load menu` | Database not connected or tables not created. Run `init.sql`. |
| Railway shows old deployment | Trigger a manual redeploy from the Railway dashboard. |