import { Request, Response, NextFunction } from "express";
import client from "prom-client";

// Initialize Prometheus registry
export const register = new client.Registry();

// Add default metrics
client.collectDefaultMetrics({ register });

// Define custom metrics
export const httpRequestCount = new client.Counter({
    name: "http_request_count",
    help: "Total number of HTTP requests",
    labelNames: ["method", "route", "status_code"],
});

export const httpRequestDuration = new client.Histogram({
    name: "http_request_duration_seconds",
    help: "Duration of HTTP requests in seconds",
    labelNames: ["method", "route", "status_code"],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
});

register.registerMetric(httpRequestCount);
register.registerMetric(httpRequestDuration);

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = (Date.now() - start) / 1000;
        const route = req.route ? req.route.path : req.path;
        const statusCode = res.statusCode.toString();

        httpRequestCount.inc({
            method: req.method,
            route,
            status_code: statusCode,
        });

        httpRequestDuration.observe(
            {
                method: req.method,
                route,
                status_code: statusCode,
            },
            duration
        );
    });

    next();
};
