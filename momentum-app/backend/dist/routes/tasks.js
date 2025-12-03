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
    const tasks = await Task_1.default.find();
    console.log("Tasks from MongoDB : ", tasks);
    res.json(tasks);
});
// POST - create task
router.post("/", async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const task = new Task_1.default({ title, description, tags });
        await task.save();
        res.status(201).json(task);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create task" });
    }
});
exports.default = router;
