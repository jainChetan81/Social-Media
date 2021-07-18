const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.userById = (req, res, next, id) => {
	User.findById(id).exec((err, user) => {
		if (err || !user) return res.status(400).json({ error: "User not found" });
		req.profile = user; //add profile objec in req with user info
		next();
	});
};
exports.hasAuthorization = (req, res, next) => {
	const authorized = req.profile && req.auth && req.profile._id === req.auth._id;
	if (!authorized)
		return res.status(403).json({ error: "User is not authorized to perfor this action!" });
	next();
};
exports.allUsers = (req, res, next) => {
	User.find((err, users) => {
		if (err) return res.status(400).json({ error: err });
		res.json(users);
	}).select(" name email updated created");
};
