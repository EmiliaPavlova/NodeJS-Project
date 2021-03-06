import City from '../models';

City.find({}).removeAsync()
  .then(() => {
    City.create({
      name: "Brest",
      country: "Belarus",
      capital: false,
      location: {
          lat: 52.097621,
          long: 23.734050
      }
    },
    {
      name: "Sofia",
      country: "Bulgaria",
      capital: true,
      location: {
          lat: 42.698334,
          long: 23.319941
      }
    },
    {
      name: "Plovdiv",
      country: "Bulgaria",
      capital: false,
      location: {
          lat: 42.143899,
          long: 24.749569
      }
    },
    {
      name: "Madrid",
      country: "Spain",
      capital: true,
      location: {
          lat: 40.416775,
          long: -3.703790
      }
    },
    {
      name: "Strasbourg",
      country: "France",
      capital: false,
      location: {
          lat: 48.573405,
          long: 7.752111
      }
    })
  });
