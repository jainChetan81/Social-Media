const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.signUp = async (req, res) => {
	console.log(`req.body`, req.body);
	const userExists = await User.findOne({ email: req.body.email });
	if (userExists) return res.status(403).json({ error: "Email is taken!" });
	const user = await new User(req.body);
	await user.save();
	res.status(200).json({ success: true, message: "Signup Success! Please Login to continue" });
};
