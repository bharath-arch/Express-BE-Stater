import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import healthRouter from "./routes/health.routes";
import { authMiddleware } from "./middleware/auth.middleware";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth";
import { metricsMiddleware } from "./middleware/metrics.middleware";

dotenv.config();

const app = express();

// CORS — allow credentials (cookies) from your frontend
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));


app.all("/api/auth/*", toNodeHandler(auth)); 

// Now JSON middleware for other routes
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Metrics
app.use(metricsMiddleware);

// Other routes
app.use("/api", healthRouter);

// Protected endpoint
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "This is a protected route",
    user: (req as any).user,
    session: (req as any).session,
  });
});

export default app;
