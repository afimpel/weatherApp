var {getCity} = require("../_include/ipa-pi");
const axios = require("axios");
const Promise = require("promise");

module.exports = (req, res, next) => {
	let city = req.params.city;
	let promiseLocation = new Promise((resolve, reject) => {
		if (city) {
			resolve(city);
		} else {
			getCity()
				.then(result => {
					resolve(result);
				})
				.catch(err => {
					reject(err);
				});
		}
	});
	promiseLocation
		.then(result => {
			getCurrentAsync(result)
				.then(data => res.json({data, error: false}))
				.catch(e => {
					res.status = e.status;
					res.json({data: e.message, error: true});
				})
				.finally(s => {});
		})
		.finally(s => {});
};
async function getCurrentAsync(name) {
	let response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=0a13e7b41d094c155b939f9d197e2518&units=metric&lang=es`);
	let data = await response;
	return data.data;
}
