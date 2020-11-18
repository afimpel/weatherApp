var {getCityV2} = require ('../_include/ipa-pi');
const axios = require ('axios');
const Promise = require ('promise');

module.exports = (req, res, next) => {
  let city = req.params.city;
  let promiseLocation = new Promise ((resolve, reject) => {
    if (city) {
      resolve ({
        regionName: '',
        city,
        lat: 0,
        lon: 0,
      });
    } else {
      getCityV2 ()
        .then (result => {
          resolve (result);
        })
        .catch (err => {
          reject (err);
        });
    }
  });
  promiseLocation
    .then (result => {
      getCurrentAsync (result)
        .then (data => {
          let weather = data.weather[0];
          delete data.weather;
          data.weather = weather;
          res.json ({data, error: false});
        })
        .catch (e => {
          res.status = e.status;
          res.json ({data: e.message, error: true});
        })
        .finally (s => {});
    })
    .finally (s => {});
};
async function getCurrentAsync (obj) {
  let openweathermap = '';
  if (obj.lon == 0) {
    openweathermap = `http://api.openweathermap.org/data/2.5/weather?q=${obj.city}&appid=0a13e7b41d094c155b939f9d197e2518&units=metric&lang=es`;
  } else {
    openweathermap = `http://api.openweathermap.org/data/2.5/weather?lat=${obj.lat}&lon=${obj.lon}&appid=0a13e7b41d094c155b939f9d197e2518&units=metric&lang=es`;
  }
  let response = await axios.get (openweathermap);
  let data = await response;
  return data.data;
}
