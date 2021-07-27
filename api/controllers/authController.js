const mongoose = require("mongoose");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = mongoose.model("User");

exports.signUp = async (req, res) => {
	const userExists = await User.findOne({ email: req.body.email });
	if (userExists) return res.status(403).json({ error: "Email is taken!" });
	const user = await new User(req.body);
	await user.save();
	res.status(200).json({ success: true, message: "Signup Success! Please Login to continue" });
};
exports.signIn = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) res.status(401).json({ err: "Email or Password not defined" });
	await User.findOne({ email }).then((userExists, err) => {
		if (err || !userExists) return res.status(401).json({ error: "User Doesn't exist!" });
		if (!userExists.authenticate(password)) {
			return res.status(401).json({ error: "Email and password do not match" });
		}
		const token = jwt.sign({ _id: userExists._id }, process.env.JWT_SECRET);
		res.cookie("t", token, { expire: new Date() + 9999 });
		const { _id, name, email } = userExists;
		return res.status(200).json({ token, user: { _id, name, email } });
	});
};
/**
 * @param  {} req
 * @param  {} res
 */
exports.signOut = async (req, res) => {
	res.clearCookie("t");
	res.json({ success: true, message: "Signout Successfull!" });
};

exports.requireSignin = expressJwt({
	secret: process.env.JWT_SECRET,
	userProperty: "auth",
	algorithms: ["sha1", "RS256", "HS256"],
});
