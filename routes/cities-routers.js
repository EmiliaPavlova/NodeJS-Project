import { Router } from 'express';
import City from '../models';

module.exports = (app, data) => {
    const router = new Router();

    router
        .get('/', (req, res) => City.find((err, cities) => {
            if (err) {
                res.send(err);
            }
            res.json(cities)
        }))
        // .post('/', (req, res) => {
        //     const product = new Product();
        //     product.name = req.body.name;
        //     product.price = req.body.price;
        //     product.save((err) => {
        //         if (err) {
        //             res.send(err);
        //         }
        //         res.json({ message: 'Product created!' });
        //     })
        // })
        // .get('/:productId', (req, res) => {
        //     console.log(req.params)
        //     Product.findById(req.params.productId, (err, product) => {
        //         if (err) {
        //             res.send(err);
        //         }
        //         res.json(product);
        //     });
        // })
        // // .get('/:productId/reviews', controller.getAllReviewsByProduct)
        // // .post('/:productId/reviews', controller.createReview);

    app.use('/api/cities', router);
    // app.use('/api/products/:productId', router);
    // app.use('/api/products/:productId/reviews', router);

    return app;
};