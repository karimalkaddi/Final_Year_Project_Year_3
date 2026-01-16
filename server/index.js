import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

/* =========================
   Route imports
========================= */
import authRoutes from "./routes/auth.js";
import expenseRoutes from "./routes/expenses.js";
import predictionRoutes from "./routes/predictions.js";
import alertRoutes from "./routes/alerts.js";
import profileRoutes from "./routes/profile.js";

/* =========================
   Middleware imports
========================= */
import authMiddleware from "./middleware/auth.js";

/* =========================
   App init
========================= */
const app = express();

/* =========================
   Global middleware
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   Routes
========================= */

// Public routes
app.use("/api/auth", authRoutes);

// Protected routes (JWT required)
app.use("/api/expenses", authMiddleware, expenseRoutes);
app.use("/api/predictions", authMiddleware, predictionRoutes);
app.use("/api/alerts", authMiddleware, alertRoutes);
app.use("/api/profile", authMiddleware, profileRoutes);

/* =========================
   Database
========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) =>
    console.error("❌ MongoDB connection error:", err)
  );

/* =========================
   Server
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("🔐 JWT loaded:", !!process.env.JWT_SECRET);
});
