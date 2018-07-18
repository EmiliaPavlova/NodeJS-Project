import { Router } from 'express';

module.exports = (app) => {
    const router = new Router();
    const controller = require('../controllers').users;

    router.get('/', controller.getAllUsers);

    app.use('/api/users', router);

    return app;
};