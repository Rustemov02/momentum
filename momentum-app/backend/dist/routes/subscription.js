"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Subscription_1 = __importDefault(require("../models/Subscription"));
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    try {
        const user = req.user;
        const { endpoint, keys } = req.body;
        await Subscription_1.default.findOneAndUpdate({ userId: user._id }, { endpoint, keys }, { upsert: true, new: true });
        res.status(201).json({ message: "Subscription saved" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to save subscription" });
    }
});
exports.default = router;
