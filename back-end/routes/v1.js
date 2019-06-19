var express = require("express");
var router = express.Router();
var location = require("./location");
var current = require("./current");
var forecast = require("./forecast");

router.get("/", (req, res, next) => {
	res.json({name: "API Weather", version: "1.0.0", error: false});
});
router.get("/location", location);
router.get("/current/:city?", current);
router.get("/forecast/:city?", forecast);
module.exports = router;
