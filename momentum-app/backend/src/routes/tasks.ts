import express, { Request, Response } from "express";
import Task from "../models/Task";

const router = express.Router();

// Get All Tasks
router.get("/", async (req: Request, res: Response) => {
  const tasks = await Task.find();
  console.log("Tasks from MongoDB : ", tasks);
  res.json(tasks);
});

// POST - create task
router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, description, tags } = req.body;
    const task = new Task({ title, description, tags });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create task" });
  }
});

export default router;
