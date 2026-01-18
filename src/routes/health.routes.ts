import { Router } from "express";
import { register } from "../middleware/metrics.middleware";

const healthRouter = Router();

healthRouter.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

healthRouter.get("/metrics", async (req, res) => {
    try {
        res.set("Content-Type", register.contentType);
        res.end(await register.metrics());
    } catch (err) {
        res.status(500).end(err);
    }
});

export default healthRouter;
