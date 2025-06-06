import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ["CLERK_PUBLISHABLE_KEY", "CLERK_SECRET_KEY"];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

// Import routes
import promptRoutes from "./routes/prompts";
import userRoutes from "./routes/users";
import healthRoutes from "./routes/health";

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration - adjust for your frontend URL
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:8081",
    credentials: true,
  })
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Clerk authentication middleware
app.use(
  clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY!,
    secretKey: process.env.CLERK_SECRET_KEY!,
  })
);

// API routes
app.use("/api/health", healthRoutes);
app.use("/api/prompts", promptRoutes);
app.use("/api/users", userRoutes);

// Global error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error:", err);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
      error: true,
      message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }
);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: true,
    message: "Route not found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Promptly API server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(
    `📱 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:8081"}`
  );
});

export default app;
