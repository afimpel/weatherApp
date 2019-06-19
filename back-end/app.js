var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");

var v1 = require("./routes/v1");

var app = express();

// view engine setup
app.use((req, res, next) => {
	if (req.headers.tester == true) {
	} else {
		req.headers["if-none-match"] = "no-match-for-this";
	}
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

app.use(
	logger("combined", {
		skip: function(req, res) {
			return req.headers.tester ? true : false;
		},
	})
);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use("/v1", v1);
app.use("/", (req, res, next) => {
	res.json({error: false});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
