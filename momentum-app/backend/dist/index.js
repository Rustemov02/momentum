"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./passport");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const auth_1 = __importDefault(require("./routes/auth"));
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
// Session setup (for Google OAuth)
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "secret-key",
    resave: false,
    saveUninitialized: false,
}));
// Passport setup
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Test route
app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is working" });
});
// Routes
app.use("/tasks", tasks_1.default);
app.use("/auth", auth_1.default);
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
