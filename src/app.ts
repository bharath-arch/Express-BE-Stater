import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { metricsMiddleware } from "./middleware/metrics.middleware";
import authRouter from "./routes/auth.routes";
import healthRouter from "./routes/health.routes";
import { authMiddleware } from "./middleware/auth.middleware";

dotenv.config();

const app = express();

// Standard middleware
app.use(express.json());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Metrics middleware (should be near the top to catch all requests)
app.use(metricsMiddleware);

// Routes
app.use("/api", healthRouter);
app.use("/api", authRouter);

// Protected route example
app.get("/api/protected", authMiddleware, (req, res) => {
    res.json({
        message: "This is a protected route",
        user: (req as any).user,
        session: (req as any).session,
    });
});

export default app;
