const express = require("express");
const { requireSignin } = require("../controllers/auth");
const { createPost, getPosts } = require("../controllers/post");
const validator = require("../helpers/validator");
const router = express.Router();

router.get("/", getPosts);
router.post("/post", validator.createPostValidator, requireSignin, createPost);

module.exports = router;
