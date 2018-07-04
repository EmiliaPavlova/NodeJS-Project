import tokenVerification from '../middlewares/token-verificating-middleware';

module.exports = (app) => {
    const auth = require('./auth-routes')(app);

    app.use(tokenVerification);

    const products = require('./products-routes')(app);
    const users = require('./users-routers')(app);
};
