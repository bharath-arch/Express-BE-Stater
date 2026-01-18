


# 📘 Production-Ready Express + Better Auth Backend

A **production-ready Express.js backend** written in **TypeScript** with:

- **Better Auth** — email/password authentication
- **Prisma ORM** — PostgreSQL (primary) + SQLite (fallback)
- **Prometheus + Grafana** monitoring
- Security best practices (CORS, rate limiting, secure sessions)

## 🚀 Features

- Express + TypeScript
- Better Auth (email & password auth)
- Prisma ORM with auto-detected provider (PostgreSQL / SQLite)
- Prometheus metrics endpoint `/api/metrics`
- Protected routes via middleware
- Rate limiting
- Secure CORS configuration

## 📦 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Create `.env` file

```env

PORT=3000
# Database (choose one)
DATABASE_URL="file:./dev.db"  #SQLite (development)
# DATABASE_URL="postgresql://user:pass@localhost:5432/prod_db?schema=public"   #PostgreSQL (production)

# Better Auth
BETTER_AUTH_SECRET="your-very-long-random-secret-key"
BETTER_AUTH_URL="http://localhost:3000"
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# (Optional but recommended) Auto-configure provider based on DATABASE_URL
npx ts-node src/utils/setup-db.ts

# Run migrations (creates User, Session, Account... tables)
npx prisma migrate dev --name init
```

### 4. Run the Server

**Development**

```bash
npm run dev
```

**Production**

```bash
npm run build
npm start
```

Server will listen on the port specified in `.env` (default: 3000).

## 🔐 Authentication Endpoints (Better Auth)

All auth routes live under `/api/auth/`

| Action          | Method | Path                        | Description             |
|-----------------|--------|-----------------------------|--------------------------|
| Register        | POST   | `/api/auth/sign-up/email`   | Create new user          |
| Login           | POST   | `/api/auth/sign-in/email`   | Sign in                  |
| Logout          | POST   | `/api/auth/sign-out`        | End session              |
| Check session   | GET    | `/api/auth/ok`              | Returns 200 if authenticated |

### Example Requests

**Sign Up**

```http
POST http://localhost:3000/api/auth/sign-up/email
Content-Type: application/json
Origin: http://localhost:5173

{
  "name": "Alice Example",
  "email": "alice@example.com",
  "password": "securePassword123"
}
```

**Sign In**

```http
POST http://localhost:3000/api/auth/sign-in/email
Content-Type: application/json
Origin: http://localhost:5173

{
  "email": "alice@example.com",
  "password": "securePassword123"
}
```

**Sign Out**

```http
POST http://localhost:3000/api/auth/sign-out
```

**Check Session**

```http
GET http://localhost:3000/api/auth/ok
```

## 🛡️ Protected Routes Example

```ts
// Example protected route
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({
    message: "This is protected",
    user: req.user,
    session: req.session
  });
});
```

## 📊 Monitoring (Prometheus + Grafana)

Metrics endpoint: **`GET /api/metrics`**

### Prometheus scrape config example

```yaml
scrape_configs:
  - job_name: 'express-backend'
    scrape_interval: 5s
    metrics_path: '/api/metrics'
    static_configs:
      - targets: ['localhost:3000']
```

### Grafana

1. Add Prometheus as data source
2. Import the provided `grafana-dashboard.json` (if you have one)

## 🗂 Project Structure

```
src/
├── app.ts                # Express app setup + middleware
├── server.ts             # Entry point (starts the server)
├── routes/               # API route handlers
├── middleware/           # auth, metrics, rate-limit, etc.
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── utils/
│   └── setup-db.ts       # Auto-configures Prisma provider
└── config/
    └── auth.ts           # Better Auth configuration
```

## 🛡 Security & Best Practices

- CORS restricted to your frontend origin(s) + credentials support
- Secure session handling via Better Auth
- Rate limiting on auth & API routes
- Prometheus metrics for observability
- Environment-based database provider (PostgreSQL / SQLite)
- `BETTER_AUTH_SECRET` should be strong & unique

> **Important reminder**:  
> Make sure `emailAndPassword: { enabled: true }` is set in your Better Auth config.

Good luck building! 🚀
