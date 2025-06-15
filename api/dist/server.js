"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_2 = require("@clerk/express");
dotenv_1.default.config();
const requiredEnvVars = ["CLERK_PUBLISHABLE_KEY", "CLERK_SECRET_KEY"];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`❌ Missing required environment variable: ${envVar}`);
        process.exit(1);
    }
}
const prompts_1 = __importDefault(require("./routes/prompts"));
const users_1 = __importDefault(require("./routes/users"));
const health_1 = __importDefault(require("./routes/health"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:8081",
    credentials: true,
}));
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_2.clerkMiddleware)({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
}));
app.use("/api/health", health_1.default);
app.use("/api/prompts", prompts_1.default);
app.use("/api/users", users_1.default);
app.use((err, req, res, next) => {
    console.error("Error:", err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        error: true,
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
});
app.use("*", (req, res) => {
    res.status(404).json({
        error: true,
        message: "Route not found",
    });
});
app.listen(PORT, () => {
    console.log(`🚀 Promptly API server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:8081"}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map