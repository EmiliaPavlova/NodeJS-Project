const cookieParser = require('cookie-parser');
const express = require('express');

const configApp = (app) => {
    app.use(cookieParser());
};

module.exports = { configApp };