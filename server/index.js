import authRoutes from "./routes/auth.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import expenseRoutes from "./routes/expenses.js";
import predictionRoutes from "./routes/predictions.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/expenses", expenseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/predictions", predictionRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
