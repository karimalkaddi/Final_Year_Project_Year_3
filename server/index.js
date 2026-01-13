import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import expensesRoutes from "./routes/expenses.js";

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/expenses", expensesRoutes);

// DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
