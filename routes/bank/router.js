var express = require('express');
var router = express.Router();
const Transaction = require('./transaction')

module.exports = async function (app) {
    app.use('/api/bank',Transaction)
};
