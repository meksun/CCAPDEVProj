const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/users.js')


app.get('/', (req, res) => {
    
    res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
})

module.exports = app;