"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./passport");
require("./services/notificationScheduler");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const auth_1 = __importDefault(require("./routes/auth"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const subscription_1 = __importDefault(require("./routes/subscription"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;
mongoose_1.default
    .connect(mongoUri)
    .then(() => console.log("MongoDB connected !"))
    .catch((err) => console.log("MongoDB connection error : ", err));
// Middleware
const requireAuth = (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    next();
};
const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("CORS icazə vermədi"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
app.set("trust proxy", 1);
// Session setup (for Google OAuth)
const isProduction = process.env.NODE_ENV === "production";
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "secret-key",
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: "sessions",
    }),
    cookie: {
        secure: isProduction, // HTTPS üçün
        httpOnly: true, // XSS təhlükəsizliyi
        sameSite: isProduction ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000, // 24 saat
        // domain: "momentum02.onrender.com", // Backend domain
    },
}));
// Passport setup
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.get("/api/me", (req, res) => {
    if (!req.session || !req.session.passport?.user) {
        return res.status(401).json({ user: null });
    }
    const u = req.user;
    res.json({
        user: {
            id: u._id,
            email: u.email,
            name: u.name,
        },
    });
});
// Routes
app.use("/tasks", requireAuth, tasks_1.default);
app.use("/auth", auth_1.default);
app.use("/subscription", requireAuth, subscription_1.default);
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
