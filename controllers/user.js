const mongoose = require("mongoose");
const _ = require("lodash");
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
exports.getUser = (req, res) => {
	const { created, _id, name, email } = req.profile;
	res.json({ created, _id, name, email });
};

//function to update current user profile
exports.updateUser = (req, res, next) => {
	let user = req.profile;
	user = _.extend(user, req.body); //extend- mutate the user object with req.body
	user.updated = Date.now();
	user.save((err) => {
		if (err) return res.status(400).json({ error: err });
		res.json(user);
	});
};

//function to delete current user profile
exports.deleteUser = (req, res, next) => {
	let user = req.profile;
	user.remove((err) => {
		if (err) return res.status(400).json({ error: err });
		res.json({ message: "User has been deleted successfully" });
	});
};
