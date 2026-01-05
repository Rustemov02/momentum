import express from "express";
import passport from "passport";

const router = express.Router();

// Google login başlat
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Uğurlu login olduqda frontend-ə yönləndir
    res.redirect("/");
  }
);

// Logout (Düzəldilmiş)
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout zamanı xəta" });
    }
    res.redirect("/");
  });
});

export default router;
