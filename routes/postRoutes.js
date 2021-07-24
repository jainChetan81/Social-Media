const express = require("express");
const { requireSignin } = require("../controllers/authController");
const { createPost, getPosts } = require("../controllers/postController");
const { userById } = require("../controllers/userController");
const validator = require("../helpers/validator");
const router = express.Router();

router.get("/", getPosts);
router.post("/post/new/:userId", requireSignin, createPost, validator.createPostValidator);

//any route containing userId our app will first execute this method
router.param("userId", userById);

module.exports = router;
