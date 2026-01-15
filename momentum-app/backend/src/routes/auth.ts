import { Router } from "express";
import passport from "passport";

const router = Router();

// Google login start
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://momentum02.vercel.app/login",
  }),
  (req, res) => {
    // burada user artıq authenticated-dir
    res.redirect("https://momentum02.vercel.app");
  }
);

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("https://momentum02.vercel.app");
  });
});

export default router;
