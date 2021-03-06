import { Router } from 'express';
import { Product, Review } from '../models';

module.exports = (app) => {
    const router = new Router();

    router
        .get('/', (req, res) => Product.find((err, products) => {
            if (err) {
                res.send(err);
            }
            res.json(products)
        }))
        .post('/', (req, res) => {
            const product = new Product();
            product.name = req.body.name;
            product.price = req.body.price;
            product.lastModifiedDate = Date.now;
            product.save((err) => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Product created!' });
            })
        })
        .get('/:productId', (req, res) => {
            Product.findById(req.params.productId, (err, product) => {
                if (err) {
                    res.send(err);
                }
                res.json(product);
            });
        })
        .get('/:productId/reviews', (req, res) => {
            Product.findById(req.params.productId, (err, product) => {
                if (err) {
                    res.send(err);
                }
            })
            .then(async (dbProduct) => {
                Review.find((err, reviews) => {
                    if (err) {
                        res.send(err);
                    }
                    let result = reviews.filter((review) => review.productId == dbProduct._id);
                    res.json(result);
                });
        })
        .delete('/:productId', (req, res) => {
            const id = req.params.productId;
            City.find({_id: id})
              .remove((err) => {
                if (err) {
                  res.send(err);
                }
              res.json({ message: 'Product deleted!' });
            });
        });
    });

  app.use('/api/products', router);
  app.use('/api/products/:productId', router);
  app.use('/api/products/:productId/reviews', router);

  return app;
};