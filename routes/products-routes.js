const express = require('express');

module.exports = (app, data) => {
    const router = new express.Router();
    const controller = require('../controllers/products-controller').init(data);

    router
        .get('/products', controller.getAllProducts)
        .post('/products', controller.addProduct)
        .get('/products/:id', controller.getProductById)
        .get('/products/:id/reviews', controller.getProductByIdReviews)

    return router;
};