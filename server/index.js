import express from "express";
import dotenv from "dotenv";

// Initialize environment variables
dotenv.config();

// PORT
const PORT = process.env.PORT || 8000;

// Initialize an express app
const app = express();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome! The server is up and running smoothly.",
  });
});
