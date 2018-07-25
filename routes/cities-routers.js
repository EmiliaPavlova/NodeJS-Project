import { Router } from 'express';
import { City } from '../models';

module.exports = (app) => {
    const router = new Router();

    router
      .get('/', (req, res) => City.find((err, cities) => {
        if (err) {
          res.send(err);
        }
        City.countDocuments({}, (err, citiesCount) => {
          const index = Math.floor(Math.random() * citiesCount);
          const randomCity = cities[index];
          res.json(randomCity);
        });
      }))
      .get('/api/cities', (req, res) => City.find((err, cities) => {
        if (err) {
          res.send(err);
        }
        res.json(cities)
      }))
      .post('/api/cities', (req, res) => {
        const city = new City();
        city.name = req.body.name;
        city.country = req.body.country;
        city.capital = req.body.capital;
        city.location.lat = req.body.location.lat;
        city.location.long = req.body.location.long;
        city.lastModifiedDate = Date.now;
        city.save((err) => {
          if (err) {
            res.send(err);
          }
          res.send({ message: 'City created!' });
        })
      })
      .get('/api/cities/:cityId', (req, res) => {
        City.findById(req.params.cityId, (err, city) => {
          if (err) {
            res.send(err);
          }
          res.json(city);
        });
      })
      .put('/api/cities/:cityId', (req, res) => {
        const city = new City();
        const cityData = req.body;
        const id = req.params.cityId;
        City.findOneAndUpdate(
          {_id: id},
          cityData,
          {upsert: true, new: true},
          (err, city) => {
            if (err) {
              res.send(err);
            }
          city.set('lastModifiedDate', Date.now);
          res.json(city);
        });
      })
      .delete('/api/cities/:cityId', (req, res) => {
        const id = req.params.cityId;
        City.find({_id: id})
          .remove((err) => {
            if (err) {
              res.send(err);
            }
          res.send({ message: 'City deleted!' });
        });
      });

    app.use('/', router);
    app.use('/api/cities/:cityId', router);

    return app;
};