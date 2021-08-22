const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true,
	},
	email: {
		type: String,
		trim: true,
		required: true,
	},
	hashed_password: {
		type: String,
		required: true,
	},
	salt: String,
	created: {
		type: Date,
		default: Date.now(),
	},
	updated: Date,
	photo: {
		data: Buffer,
		contentType: String,
		name: String,
	},
});

userSchema
	.virtual("password")
	.set(function (password) {
		this._password = password; //temporary variable
		//generate a timestamp
		this.salt = uuidv4();
		//encrypt password
		this.hashed_password = this.encryptPassword(password);
	})
	.get(function () {
		return this._password;
	});

//methods
userSchema.methods = {
	authenticate: function (plainText) {
		return this.encryptPassword(plainText) === this.hashed_password;
	},
	encryptPassword: function (password) {
		if (!password) return "";
		try {
			return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
		} catch (err) {
			console.error("error in encryption :", err);
			return "";
		}
	},
};
mongoose.model("User", userSchema);
