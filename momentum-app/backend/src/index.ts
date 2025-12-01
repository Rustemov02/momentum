import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import taskRoutes from "./routes/tasks";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working" });
});

const mongoUri = process.env.MONGO_URI!;

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected !"))
  .catch((err) => console.log("MongoDB connection error : ", err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
