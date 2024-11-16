import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorMiddleware from "./middleware/errorMiddleware.js";
import ErrorHandler from "./utils/ErrorHandler.js";
import { successResponse } from "./utils/successResponse.js";
import csvRoutes from "./routes/csvRoutes.js";
import cookieParser from "cookie-parser";
import googleSheetsRoutes from "./routes/googleSheetsRoutes.js";

// Initialize environment variables
dotenv.config();

// PORT
const PORT = process.env.PORT || 8000;
// Initialize an express app
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Cookie parser to parse incoming cookies into request.cookies
app.use(cookieParser());

// Body parser middleware to parse incoming data into request body
app.use(express.json());

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Routes
app.use("/api/v1/csv", csvRoutes);
app.use("/api/v1/googlesheets", googleSheetsRoutes);

// Test route
app.get("/", (req, res) => {
  successResponse("Welcome! The server is up and running smoothly.", 200, res);
});

// Unknown Route
app.all("*", (req, res, next) => {
  return next(new ErrorHandler(`Route ${req.originalUrl} not found`), 404);
});

// Error Middleware
app.use(errorMiddleware);
