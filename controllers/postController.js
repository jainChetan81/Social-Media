const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const formidable = require("formidable");
const fs = require("fs");

exports.getPosts = (req, res) => {
	const posts = Post.find()
		.populate("postedBy", "_id name")
		.select("_id title body")
		.then((result) => res.status(200).json({ posts: result }))
		.catch((err) => console.error(`error : ${err}`));
};
exports.createPost = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;
	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.status(400).json({ error: "Image could not be uploaded" });
		}
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
