const express = require('express');

module.exports = (app) => {
    app.get('/api/users',(req, res) => {
        res.send('getAllUsers');
    });

    return app;
};