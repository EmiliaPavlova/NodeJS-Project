function randomCity(req, res) {
  const name = req.swagger.params.name.value || 'Brest';
  const country = req.swagger.params.country.value || 'Belarus';
  const capital = req.swagger.params.capital.value || 'false';
  const lat = req.swagger.params.lat.value || 52.097621;
  const long = req.swagger.params.long.value || 23.73405;
  const randomCity = {
    'name': name,
    'country': country,
    'capital': capital._id,
    'location': {
      'lat': lat,
      'long': 23.73405
    }
  }
  res.json(randomCity);
}

function getCities(req, res) {
  const name = req.swagger.params.name.value || 'Brest';
  const country = req.swagger.params.country.value || 'Belarus';
  const capital = req.swagger.params.capital.value || 'false';
  const lat = req.swagger.params.lat.value || 52.097621;
  const long = req.swagger.params.long.value || 23.73405;
  const getCities = {
    'name': name,
    'country': country,
    'capital': capital._id,
    'location': {
      'lat': lat,
      'long': 23.73405
    }
  }
  res.json(getCities);
}

function addCity(req, res) {
  const name = req.swagger.params.name.value || 'Brest';
  const country = req.swagger.params.country.value || 'Belarus';
  const capital = req.swagger.params.capital.value || 'false';
  const lat = req.swagger.params.lat.value || 52.097621;
  const long = req.swagger.params.long.value || 23.73405;
  res.json(addCity);
}

function deleteCity(req, res) {
  const id = req.swagger.params.cityId;
  const name = req.swagger.params.name.value;

  res.send('Deleted');
}

module.exports = {
  randomCity: randomCity,
  getCities: getCities,
  addCity: addCity,
  deleteCity: deleteCity
};
