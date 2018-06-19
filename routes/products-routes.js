const express = require('express');

module.exports = (app) => {
    app.get('/api/products',(req, res) => {
        res.send('getAllProducts');
    });
    app.post('/api/products',(req, res) => {
        res.send('addProduct');
    });
    app.get('/api/products/:id',(req, res) => {
        res.send('getProductById for id ' + req.params.id);
    });
    app.get('/api/products/:id/reviews',(req, res) => {
        res.send('getProductByIdReviews for id ' + req.params.id);
    });

    return app;
};