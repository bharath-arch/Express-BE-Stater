# Production-Ready Express + Better Auth Backend

This is a production-ready Express.js backend written in TypeScript, featuring Better Auth, Prisma ORM with dynamic database fallback, and API monitoring with Prometheus and Grafana.

## 🚀 Features

- **Express.js + TypeScript**: Clean, modular architecture.
- **Better Auth**: Comprehensive authentication (Email/Password, Session/JWT).
- **Prisma ORM**: Supports PostgreSQL and automatically falls back to SQLite.
- **Monitoring**: Prometheus metrics exposed at `/api/metrics` and custom Grafana dashboard.
- **Security**: Rate limiting, CORS, and secure auth defaults.

## 🛠 Tech Stack

- **Framework**: Express.js
- **Language**: TypeScript
- **Auth**: Better Auth
- **ORM**: Prisma
- **Database**: PostgreSQL (Primary) / SQLite (Fallback)
- **Monitoring**: prom-client, Prometheus, Grafana

## 📦 Getting Started

### 1. Installation

```bash
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
PORT=3000
DATABASE_URL="file:./dev.db" # Or postgresql://user:password@localhost:5432/db
BETTER_AUTH_SECRET="your-super-secret-key"
BETTER_AUTH_URL="http://localhost:3000"
```

### 3. Database Migration

The project includes a utility to automatically set the Prisma provider based on your `DATABASE_URL`.

```bash
# Set provider and generate client
npx ts-node src/utils/setup-db.ts
npx prisma generate

# Run migrations
# For SQLite:
npx prisma migrate dev --name init
# For PostgreSQL:
# npx prisma migrate dev --name init
```

### 4. Running the Server

```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

## 📊 Monitoring (Grafana + Prometheus)

### Prometheus Setup
Add the following to your `prometheus.yml`:

```yaml
scrape_configs:
  - job_name: 'express-backend'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:3000']
    metrics_path: '/api/metrics'
```

### Grafana Setup
1. Add Prometheus as a Data Source in Grafana.
2. Import the `grafana-dashboard.json` file provided in the root directory.

## 🔐 Authentication Endpoints (Better Auth)

Better Auth endpoints are available under `/api/auth/*`.

- **Register**: `POST /api/auth/sign-up`
- **Login**: `POST /api/auth/sign-in`
- **Logout**: `POST /api/auth/sign-out`
- **Session**: `GET /api/auth/get-session`

### Protected Route Example
`GET /api/protected` requires a valid session.

## 🗂 Project Structure

```text
src/
├── app.ts            # Express application setup
├── server.ts         # Server entry point
├── routes/           # API routes
├── middleware/       # Custom middlewares (auth, metrics)
├── prisma/           # Prisma client and schema
├── utils/            # Utility functions (db setup)
└── config/           # Configuration files (better-auth)
```
