const express = require("express");
const { requireSignin } = require("../controllers/authController");
const {
	createPost,
	getPosts,
	postByUser,
	postsById,
	isPost,
	deletePost,
	updatePost,
} = require("../controllers/postController");
const { userById } = require("../controllers/userController");
const validator = require("../helpers/validator");
const router = express.Router();

router.get("/", getPosts);
router.post("/post/new/:userId", requireSignin, createPost, validator.createPostValidator);
router.get("/post/by/:userId", requireSignin, postByUser);
router.put("/post/:postId", requireSignin, isPost, updatePost);
router.delete("/post/:postId", requireSignin, isPost, deletePost);

//any route containing userId our app will first execute this method
router.param("userId", userById);
//any route containing postId our app will first execute this method
router.param("postId", postsById);

module.exports = router;
