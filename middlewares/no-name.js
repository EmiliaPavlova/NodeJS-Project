const express = require('express');
const cookieParser = require('cookie-parser');

const configApp = (app) => {
    app.use(cookieParser());
};

module.exports = { configApp };