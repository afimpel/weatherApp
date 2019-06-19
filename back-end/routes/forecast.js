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
			getForecastAsync(result)
				.then(_data => {
					let days = new Date().getUTCDay();
					let dataDays = [];
					let _dataDays = [];
					_data.list.map(v => {
						let __da = new Date(v.dt * 1000).getUTCDay();
						let weather = v.weather[0];
						delete v.weather;
						v.weather = weather;
						if (__da != days) {
							_dataDays.push(v);
							if (days != 10) {
								dataDays.push(_dataDays);
								_dataDays = [];
							}
							days = __da;
						} else {
							_dataDays.push(v);
						}
					});
					let data = {dataDays, city: _data.city};
					res.json({data, error: false});
				})
				.catch(e => {
					res.status = e.status;
					res.json({data: e.message, error: true});
				})
				.finally(s => {});
		})
		.finally(s => {});
};
async function getForecastAsync(name) {
	let response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=0a13e7b41d094c155b939f9d197e2518&units=metric&lang=es`);
	let data = await response;
	return data.data;
}
