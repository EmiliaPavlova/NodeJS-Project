const express = require('express');

module.exports = (app, data) => {
    const router = new express.Router();
    const controller = require('../controllers/users-controller').init(data);

    router
        .get('/users', controller.getAllUsers)

    return router;
};