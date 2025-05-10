import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import adminRouter from "./routes/admin.route.js";
import adminAuthRouter from "./routes/adminAuth.route.js";
import studentRouter from "./routes/Student.route.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import studentAuthRouter from './routes/studentAuth.route.js'
import cors from "cors";
import materialRouter from "./routes/materials.route.js"

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const app = express();


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Added 'credentials' if you use cookies

// Define routes
app.use("/api/admin", adminRouter);
app.use("/api/adminAuth", adminAuthRouter);
app.use("/api/student", studentRouter);
app.use("/api/studentAuth", studentAuthRouter);
app.use("/api/materials", materialRouter)

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
