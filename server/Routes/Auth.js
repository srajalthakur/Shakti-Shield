import express from "express";
import passport from "passport";

const router = express.Router();

// 🔐 Step 1: Google Login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 🔁 Step 2: Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: true,
  }),
  (req, res) => {
    res.send("Google Login Successful ✅");
  }
);

export default router;