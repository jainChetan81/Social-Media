const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const expressValidator = require("express-validator");
require("./models/postModel");
require("./models/userModel");

dotenv.config();

//database
mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log(`MongoDB Connected!`);
	});

mongoose.connection.on("error", (err) => {
	console.error(`DB Connection error: ${err.message}`);
});

const app = express();
const PORT = process.env.PORT || 8080;

//middleware
app.use(morgan("dev"));
//to log everything on console
app.use(bodyParser.json());
//because express on itself doesn't pass the request body
// app.use(express.json({limit: "50mb"}));
// app.use(express.urlencoded());
app.use(expressValidator());
app.use(cookieParser());

app.use("/", require("./routes/postRoutes"));
app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/userRoutes"));
app.use(function (err, req, res, next) {
	if (err.name === "UnauthorizedError") res.status(401).json({ error: "Unauthorized`" });
});

app.listen(PORT, () => {
	console.log("Server is listening at port :", PORT);
});
