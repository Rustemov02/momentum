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

router.post("/",async (req: Request, res : Response) => {
    const 
})