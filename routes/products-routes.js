const { Router } = require('express');

const products = [{
    id: 1,
    name: 'Product 1',
},
{
    id: 2,
    name: 'Product 2',
},
{
    id: 3,
    name: 'Product 3',
}];

module.exports = (app) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            res.send(products);
        })
        .post('/', (req, res) => {
            const product = req.body;
            product.id = products.length + 1;
            products.push(product);
            res.status(201)
                .send(product);
        })
        .get('/:id', (req, res) => {
            const id = parseInt(req.params.id, 10);
            const product = products.find(p => p.id === id);
            if (!product) {
                res.send('No such product');
            }
            res.send(product);
        })
        .get('/:id/reviews', (req, res) => {
            res.send('getProductByIdReviews for id ' + req.params.id);
        });

    app.use('/api/products', router);
    app.use('/api/products/:id', router);
    app.use('/api/products/:id/reviews', router);

    return app;
};