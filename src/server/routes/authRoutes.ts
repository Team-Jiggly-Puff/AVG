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
    failureRedirect: '/api/users/signin', // not sure if we redirect to regular sign in page?
    successRedirect: '/'
}));

export default router;
  
