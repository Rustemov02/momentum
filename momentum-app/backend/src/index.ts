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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const mongoUri = process.env.MONGO_URI!;

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected !"))
  .catch((err) => console.log("MongoDB connection error : ", err));

// Middleware
app.use(cors());
app.use(express.json());

// Session setup (for Google OAuth)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working" });
});

// Routes
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
