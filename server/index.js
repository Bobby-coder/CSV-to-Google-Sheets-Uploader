import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorMiddleware from "./middleware/errorMiddleware.js";
import ErrorHandler from "./utils/ErrorHandler.js";
import { successResponse } from "./utils/successResponse.js";
import csvRoutes from "./routes/csvRoutes.js";

// Initialize environment variables
dotenv.config();

// PORT
const PORT = process.env.PORT || 8000;

// Initialize an express app
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Test route
app.get("/", (req, res) => {
  successResponse("Welcome! The server is up and running smoothly.", 200, res);
});

// Routes
app.use("/api/v1/csv", csvRoutes);

// Unknown Route
app.all("*", (req, res, next) => {
  return next(new ErrorHandler(`Route ${req.originalUrl} not found`), 404);
});

// Error Middleware
app.use(errorMiddleware);
