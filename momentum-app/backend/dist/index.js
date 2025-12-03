"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const tasks_1 = __importDefault(require("./routes/tasks"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;
mongoose_1.default
    .connect(mongoUri)
    .then(() => console.log("MongoDB connected !"))
    .catch((err) => console.log("MongoDB connection error : ", err));
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Test route
app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is working" });
});
app.use("/tasks", tasks_1.default);
// app.get("/api/tasks", async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.json(tasks);
//   } catch (err) {
//     console.error("Failed to get tasks:", err);
//     res.status(500).json({ message: "Failed to get tasks" });
//   }
// });
// --- POST create task ---
// app.post("/api/tasks", async (req: Request, res: Response) => {
//   try {
//     const { title, description } = req.body;
//     const task = new Task({ title, description });
//     await task.save();
//     res.status(201).json(task);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to create task" });
//   }
// });
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
