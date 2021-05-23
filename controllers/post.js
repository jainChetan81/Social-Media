const mongoose = require("mongoose");
const Post = mongoose.model("Post");

exports.getPosts = (req, res) => {
	const posts = Post.find()
		.select("_id title")
		.then((result) => res.status(200).json({posts: result}))
		.catch((err) => console.error(`error : ${err}`));
};
exports.createPost = (req, res) => {
	console.log(`Creating Post: ${req.body.title}`);
	const post = new Post(req.body);
	post.save().then((result) => {
		res.status(200).json({
			post: result,
		});
	});
};
