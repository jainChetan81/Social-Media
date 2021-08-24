const express = require("express");
const { requireSignin } = require("../controllers/authController");
const {
	userById,
	allUsers,
	getUser,
	updateUser,
	deleteUser,
	userPhotos,
} = require("../controllers/userController");
const router = express.Router();
router.get("/users", allUsers);
router.get("/user/:userId", requireSignin, getUser);
router.put("/user/:userId", requireSignin, updateUser);
router.delete("/user/:userId", requireSignin, deleteUser);
router.get("/user/photo/:userId", userPhotos);
//any route containing userId our app will first execute this method
router.param("userId", userById);

module.exports = router;
