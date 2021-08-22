const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");

exports.postsById = (req, res, next, id) => {
	Post.findById(id)
		.select("_id title body")
		.populate("postedBy", "_id name")
		.exec((err, post) => {
			if (err || !post)
				return res.status(400).json({ error: err, message: "Couldn't find post'" });
			req.post = post;
			next();
		});
};
exports.getPosts = (req, res) => {
	Post.find()
		.populate("postedBy", "_id name")
		.select("_id title body")
		.then((result) => res.status(200).json({ posts: result }))
		.catch((err) => console.error(`error : ${err}`));
};

exports.updatePost = (req, res) => {
	let post = req.post;
	post = _.extend(post, req.body); //extend- mutate the post object with req.body
	post.updated = Date.now();
	console.log(`post`, post);
	post.save((err) => {
		if (err) return res.status(400).json({ error: err });
		res.json(post);
	});
};

exports.createPost = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		if (err) res.status(400).json({ error: "Image could not be uploaded" });

		const newPost = new Post(fields);
		req.profile.hashed_password = undefined;
		req.profile.salt = undefined;
		newPost.postedBy = req.profile;
		if (files.photo) {
			newPost.photo.data = fs.readFileSync(files.photo.path);
			newPost.photo.contentType = files.photo.type;
		}

		newPost.body = fields.body;
		newPost.save((saveError, result) => {
			return saveError
				? res.status(400).json({ error: saveError })
				: res.status(200).json({ result });
		});
	});
	const post = new Post(req.body);
	post.save().then((result) => {
		res.status(200).json({
			post: result,
		});
	});
};

exports.postByUser = (req, res) => {
	Post.find({ postedBy: req.profile._id })
		.populate("postedBy", "_id name")
		.sort("_created")
		.exec((err, post) => {
			if (err) return res.status(400).json({ error: err });
			res.json(post);
		});
};
exports.isPost = (req, res, next) => {
	const isPost = req.post && req.auth && req.post.postedBy._id == req.auth._id;
	if (!isPost)
		return res.status(403).json({ error: "You are not allowed to access this resource" });
	next();
};

exports.deletePost = (req, res, next) => {
	const post = req.post;
	post.remove((err) => {
		if (err) return res.status(400).json({ error: err });
		res.json({ message: "Post deleted Successfully" });
	});
};
