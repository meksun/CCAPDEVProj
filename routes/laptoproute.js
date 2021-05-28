const express = require('express');
const app = express();

const products = require('../controllers/product_ctrl');

app.get('/',products.displayLaptopPages);


module.exports = app;