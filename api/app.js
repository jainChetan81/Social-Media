const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const fs = require("fs");
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

//read on uget request of "/"
app.get("/", (req, res) => {
	fs.readFile("docs/apiDocs.json", (err, data) => {
		if (err) return res.status(400).json({ error: err });
		const docs = JSON.parse(data);
		res.json(docs);
	});
});

//middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
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
	if (err.name === "UnauthorizedError") res.status(401).json({ error: "Unauthorized Error" });
});

app.listen(PORT, () => {
	console.log("Server is listening at port :", PORT);
});
