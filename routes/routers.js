module.exports = (app) => {
    const auth = require('./auth-routes')(app);
    const products = require('./products-routes')(app);
    const users = require('./users-routers')(app);
};
