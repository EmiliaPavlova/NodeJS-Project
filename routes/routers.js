module.exports = (app) => {
    const products = require('./api/products')(app);
    const changePassword = require('./api/users')(app);

    app.use('/', products);
    app.use('/api/products/:id', products);
    app.use('/:id/reviews', products);
    app.use('/', users);
};
