"use strict";
var getContent = require("./getContent");
var _location = function(ip, field) {
	var url = "http://ip-api.com/json/";
	var strField;
	var strIP;
	var path;
	let fields = [
		"status",
		"message",
		"continent",
		"continentCode",
		"country",
		"countryCode",
		"region",
		"regionName",
		"city",
		"district",
		"zip",
		"lat",
		"lon",
		"timezone",
		"currency",
		"isp",
		"org",
		"as",
		"asname",
		"reverse",
		"mobile",
		"proxy",
		"query",
	];

	if (typeof field !== "undefined") {
		strField = "?fields=" + field;
	} else {
		strField = "?fields=" + fields.join();
	}

	if (typeof ip !== "undefined") {
		strIP = ip;
	} else {
		strIP = "";
	}
	path = url + strIP + strField + "&lang=es";
	return getContent(path);
};

var getCity = () => {
	return new Promise((resolve, reject) => {
		_location("", "city")
			.then(result => {
				var obj = JSON.parse(result);
				resolve(obj.city);
			})
			.catch(err => {
				reject(err);
			});
	});
};
var location = (ip, field) => {
	return new Promise((resolve, reject) => {
		_location(ip, field)
			.then(result => {
				var obj = JSON.parse(result);
				resolve(obj);
			})
			.catch(err => {
				reject(err);
			});
	});
};
module.exports = {location, getCity};
