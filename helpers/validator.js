exports.createPostValidator = (req, res, next) => {
	req.check("title", "Write a title").notEmpty();
	req.check("title", "Title mist be between 4-150 characters").isLength({
		min: 4,
		max: 150,
	});
	req.check("body", "Write a Body").notEmpty();
	req.check("body", "Body mist be between 2000 characters").isLength({
		min: 4,
		max: 200,
	});

	const errors = req.validationErrors();
	if (errors) {
		console.log(`errors`, errors);
		const firstError = errors.map((error) => error.msg)[0];
		return res.status(400).json({ error: firstError });
	}
	next();
};
exports.userSignupValidator = (req, res, next) => {
	req.check("name", "Name is required").notEmpty();
	req.check("email", "Email must be between 3 - 32 characters")
		.matches(/.+\@.+\..+/)
		.withMessage("Email must contain an @")
		.isLength({
			min: 4,
			max: 32,
		});
	req.check("password", "Password i required").notEmpty();
	req.check("password")
		.isLength({
			min: 6,
		})
		.withMessage("Password must contain at least 6 characters")
		.matches(/\d/)
		.withMessage("Password Must contain a number");

	const errors = req.validationErrors();
	if (errors) {
		console.log(`errors`, errors);
		const firstError = errors.map((error) => error.msg)[0];
		return res.status(400).json({ error: firstError });
	}
	next();
};
