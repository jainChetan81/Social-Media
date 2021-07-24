const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: "Title is required",
		minlength: 4,
		maxlength: 100,
	},
	body: {
		type: String,
		required: "Body is required",
		minlength: 4,
		maxlength: 1000,
	},
	photo: {
		type: Buffer,
		contentType: String,
	},
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: "PostedBy is required",
	},
	created: {
		type: Date,
		default: Date.now,
	},
});

mongoose.model("Post", postSchema);
