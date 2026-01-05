"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Task_1 = __importDefault(require("../models/Task"));
const router = express_1.default.Router();
// Get All Tasks
router.get("/", async (req, res) => {
    const tasks = await Task_1.default.find().sort({ createdAt: -1 });
    console.log("Tasks from MongoDB : ", tasks);
    res.json(tasks);
});
// POST - create task
router.post("/", async (req, res) => {
    try {
        const { title, description, tags, expiryTime } = req.body;
        let expiresAt = null;
        if (expiryTime && expiryTime !== "never") {
            const now = new Date();
            switch (expiryTime) {
                case "24hours":
                    expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);
                    break;
                case "3days":
                    expiresAt = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
                    break;
                case "7days":
                    expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                    break;
                default:
                    expiresAt = null;
            }
        }
        const task = new Task_1.default({ title, description, tags, expiresAt });
        await task.save();
        res.status(201).json(task);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create task" });
    }
});
// DELETE - delete task
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // ID-yə görə tapır və silir
        const deletedTask = await Task_1.default.findByIdAndDelete(id);
        // Əgər tapılmasa (null qayıtsa) 404 qaytarır
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        // Uğurlu olsa mesaj və silinən ID-ni qaytarır
        res.json({ message: "Task deleted successfully", id: deletedTask._id });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to delete task" });
    }
});
// PUT - update task
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, tags } = req.body;
        if (!title || title.trim() === "") {
            return res.status(400).json({ message: "Title is required" });
        }
        const updatedTask = await Task_1.default.findByIdAndUpdate(id, { title, description, ...(tags !== undefined && { tags }) }, {
            new: true,
            runValidators: true,
        });
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(updatedTask);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to update task" });
    }
});
// Get all tags with their tasks using aggregation
router.get("/tags", async (req, res) => {
    try {
        const tagsWithTasks = await Task_1.default.aggregate([
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
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to fetch tags" });
    }
});
exports.default = router;
