const express = require("express");
const { signUp, signIn, signOut } = require("../controllers/authController");
const { userSignupValidator } = require("../helpers/validator");
const { userById } = require("../controllers/userController");
const router = express.Router();
router.post("/signup", userSignupValidator, signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);
//any route containing userId our app will first execute this method
router.param("userId", userById);

module.exports = router;
