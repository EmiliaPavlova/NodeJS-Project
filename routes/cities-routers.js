import { Router } from 'express';
import { City } from '../models';

module.exports = (app, data) => {
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
        city.save((err) => {
          if (err) {
            res.send(err);
          }
          res.json({ message: 'City created!' });
        })
      })
      // .get('/:productId', (req, res) => {
      //   console.log(req.params)
      //   Product.findById(req.params.productId, (err, product) => {
      //     if (err) {
      //       res.send(err);
      //     }
      //     res.json(product);
      //   });
      // })
      // // .get('/:productId/reviews', controller.getAllReviewsByProduct)
      // // .post('/:productId/reviews', controller.createReview);

    app.use('/', router);
    // app.use('/api/products/:productId', router);
    // app.use('/api/products/:productId/reviews', router);

    return app;
};