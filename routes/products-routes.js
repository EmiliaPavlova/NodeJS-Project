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
    app.get('/api/products',(req, res) => {
        res.send(products);
    });
    app.post('/api/products',(req, res) => {
        const product = req.body;
        product.id = products.length + 1;
        products.push(product);
        res.status(201)
            .send(product);
    });
    app.get('/api/products/:id',(req, res) => {
        res.send('getProductById for id ' + req.params.id);
    });
    app.get('/api/products/:id/reviews',(req, res) => {
        res.send('getProductByIdReviews for id ' + req.params.id);
    });

    return app;
};