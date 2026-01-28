import "./passport";
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import Task from "./models/Task";
import taskRoutes from "./routes/tasks";
import authRoutes from "./routes/auth";
import MongoStore from "connect-mongo";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const mongoUri = process.env.MONGO_URI!;

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected !"))
  .catch((err) => console.log("MongoDB connection error : ", err));

// Middleware

const requireAuth = (req: any, res: any, next: any) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  next();
};

const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS icazə vermədi"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

app.set("trust proxy", 1);

// Session setup (for Google OAuth)
const isProduction = process.env.NODE_ENV === "production";
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
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
  }),
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/me", (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ user: null });
  }
  const u = (req as any).user;
  res.json({
    user: {
      id: u._id,
      email: u.email,
      name: u.name,
    },
  });
});

// Routes
app.use("/tasks", requireAuth, taskRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
