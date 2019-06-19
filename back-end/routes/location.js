var {location} = require("../_include/ipa-pi");

module.exports = (req, res, next) => {
	location()
		.then(data => {
			res.json({data, error: false});
		})
		.catch(err => {
			res.json({data: err, error: true});
		});
};
