import "dotenv/config";

import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import connectDB from "./config/db.js";
import cloudinary from "./config/cloudinary.js";

import galleryRoutes from "./routes/galleryRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import utilityRoutes from "./routes/utilityRoutes.js";

const app = express();

const PORT = process.env.PORT || 5000;

// Clerk authentication middleware
app.use(
  clerkMiddleware({
    authorizedParties: ["http://localhost:5173"],
  }),
);

connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Sakshi Play School API is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is healthy",
  });
});

app.get("/api/cloudinary-test", (req, res) => {
  const config = cloudinary.config();

  res.json({
    success: true,
    message: "Cloudinary configuration loaded successfully",
    cloudName: config.cloud_name,
  });
});

// Gallery API
app.use("/api/gallery", galleryRoutes);

// Events API
app.use("/api/events", eventRoutes);

// Notices API
app.use("/api/notices", noticeRoutes);

// Top Bar API
app.use("/api/utility", utilityRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
