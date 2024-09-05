import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/redirect", passport.authenticate("google", {
    failureRedirect: '/login',
    successRedirect: '/Home'
}));

export default router;
  
