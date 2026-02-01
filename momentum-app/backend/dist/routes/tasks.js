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
    const user = req.user;
    const tasks = await Task_1.default.find({ userId: user._id }).sort({ createdAt: -1 });
    console.log("Tasks from MongoDB : ", tasks);
    res.json(tasks);
});
// POST - create task
router.post("/", async (req, res) => {
    try {
        const user = req.user;
        const { title, description, tags, expiryTime } = req.body;
        const expiresAt = expiryTime && expiryTime !== "never"
            ? new Date(Date.now() + parseInt(expiryTime))
            : null;
        const task = new Task_1.default({
            title,
            description,
            tags,
            expiresAt,
            userId: user._id,
        });
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
        const user = req.user;
        const { id } = req.params;
        // ID-yə görə tapır və silir
        const deletedTask = await Task_1.default.findOneAndDelete({
            _id: id,
            userId: user._id,
        });
        // Əgər tapılmasa (null qayıtsa) 404 qaytarır
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        // Uğurlu olsa mesaj və silinən ID-ni qaytarır
        res.json({ message: "Task deleted successfully", id });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to delete task" });
    }
});
// PUT - update task
router.put("/:id", async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const { title, description, tags } = req.body;
        if (!title || title.trim() === "") {
            return res.status(400).json({ message: "Title is required" });
        }
        const updatedTask = await Task_1.default.findOneAndUpdate({ _id: id, userId: user._id }, { title, description, ...(tags !== undefined && { tags }) }, {
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
        const user = req.user;
        const tagsWithTasks = await Task_1.default.aggregate([
            { $match: { userId: user._id } },
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
