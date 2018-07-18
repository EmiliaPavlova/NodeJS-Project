import { Router } from 'express';

module.exports = (app, data) => {
    const router = new Router();
    const controller = require('../controllers').products;

    router
        .get('/', controller.getAllProducts)
        .post('/', controller.createProduct)
        .get('/:productId', controller.getProductById)
        .get('/:productId/reviews', controller.getAllReviewsByProduct)
        .post('/:productId/reviews', controller.createReview);

    app.use('/api/products', router);
    app.use('/api/products/:productId', router);
    app.use('/api/products/:productId/reviews', router);

    return app;
};