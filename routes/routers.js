module.exports = (app) => {
    const products = require('./api/products')(app);
    const users = require('./api/users')(app);

    app.use('/', products);
    app.use('/:id', products);
    app.use('/:id/reviews', products);
    app.use('/', users);
};
