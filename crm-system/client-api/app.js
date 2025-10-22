import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

// Helper functions
import { connectRedis } from "./src/helper/redis.helper.js";
import errorHandler from "./src/utils/errorHandler.js";

// Routers
import userRouter from "./src/routers/user.router.js";
import ticketRouter from "./src/routers/ticket.router.js";
import tokenRouter from "./src/routers/token.router.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors()); // consider specifying origin in production
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Logger
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("combined"));
}

// Redis connection
connectRedis();

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL, { dbName: "crm-system" })
  .then(() => console.log("✅ Mongoose is connected"))
  .catch((err) => console.log("❌ Mongoose connection error:", err));

// Routes
app.use("/v1/user", userRouter);
app.use("/v1/ticket", ticketRouter);
app.use("/v1/token", tokenRouter);

// Root route
app.get("/", (req, res) => {
  res.send("🚀 API is running successfully!");
});

// 404 handler
app.use((req, res, next) => {
  const error = new Error("Resource not found!");
  error.status = 404;
  next(error);
});

// Global error handler
app.use((error, req, res, next) => {
  errorHandler(error, res);
});

// Start server
app.listen(port, "0.0.0.0", () => {
  console.log(`✅ API is ready on http://localhost:${port}`);
});
