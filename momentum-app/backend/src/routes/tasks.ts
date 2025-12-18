import express, { Request, Response } from "express";
import Task from "../models/Task";

const router = express.Router();

// Get All Tasks
router.get("/", async (req: Request, res: Response) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
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

// DELETE - delete task
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // ID-yə görə tapır və silir
    const deletedTask = await Task.findByIdAndDelete(id);

    // Əgər tapılmasa (null qayıtsa) 404 qaytarır
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Uğurlu olsa mesaj və silinən ID-ni qaytarır
    res.json({ message: "Task deleted successfully", id: deletedTask._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

// Get all tags with their tasks using aggregation
router.get("/tags", async (req: Request, res: Response) => {
  try {
    const tagsWithTasks = await Task.aggregate([
      { $unwind: "$tags" },
      {
        $group: {
          _id: "$tags",
          tasks: {
            $push: {
              _id: "$_id",
              title: "$title",
              description: "$description",
              createdAt: "$createdAt",
              updatedAt: "$updatedAt",
            },
          },
        },
      },
      { $project: { _id: 0, tag: "$_id", tasks: 1 } },
      { $sort: { tag: 1 } },
    ]);

    res.json(tagsWithTasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch tags" });
  }
});

export default router;
