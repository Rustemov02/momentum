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
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
}), (req, res) => {
    // burada user artıq authenticated-dir
    res.redirect(`${process.env.FRONTEND_URL}`);
    console.log(process.env.FRONTEND_URL);
});
// Logout
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err)
            return next(err);
        req.session.destroy((err) => {
            res.clearCookie("connect.sid");
            res.redirect(`${process.env.FRONTEND_URL}`);
        });
    });
});
exports.default = router;
