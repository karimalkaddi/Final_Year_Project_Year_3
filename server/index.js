import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Routes
import authRoutes from "./routes/auth.js";
import expenseRoutes from "./routes/expenses.js";
import predictionRoutes from "./routes/predictions.js";

// ✅ AUTH MIDDLEWARE (your file name)
import authMiddleware from "./middleware/auth.js";

const app = express();

/* =========================
   Middleware
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   Routes
========================= */

// Auth routes (login / register)
app.use("/api/auth", authRoutes);

// Protected routes
app.use("/api/expenses", authMiddleware, expenseRoutes);
app.use("/api/predictions", authMiddleware, predictionRoutes);

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
