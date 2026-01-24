"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
// Google login start
router.get("/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
}));
// Google callback
router.get("/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "https://momentum02.vercel.app/login",
}), (req, res) => {
    // burada user artıq authenticated-dir
    res.redirect("https://momentum02.vercel.app");
});
// Logout
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("https://momentum02.vercel.app");
    });
});
exports.default = router;
