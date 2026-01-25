import { Router } from "express";
import passport from "passport";

const router = Router();

// Google login start
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  }),
  (req, res) => {
    // burada user artıq authenticated-dir
    res.redirect(`${process.env.FRONTEND_URL}`);
  },
);

// Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect(`${process.env.FRONTEND_URL}`);
  });
});

export default router;
