module.exports = (app) => {
    const products = require('./products-routes')(app);
    const users = require('./users-routers')(app);
};
