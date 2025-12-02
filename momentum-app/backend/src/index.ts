import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Task from "./models/Task";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const mongoUri = process.env.MONGO_URI!;

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected !"))
  .catch((err) => console.log("MongoDB connection error : ", err));

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working" });
});

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error("Failed to get tasks:", err);
    res.status(500).json({ message: "Failed to get tasks" });
  }
});

// --- POST create task ---
app.post("/api/tasks", async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create task" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
