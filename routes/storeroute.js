
 const express = require('express');
const app = express();

const products = require('../controllers/addproduct_ctrl');

app.get('/',products.displayStoreProducts);



module.exports = app;