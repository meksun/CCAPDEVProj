const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const maxAge = 3 * 24 * 60 * 60;
const User = require('../models/users.js');
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'
app.get('/',(req,res)=>{
	res.render('view/login',{title:'Login'});
 });

 app.post('/', async (req, res) => {
 	const { username, 
 		password,
 		
 	} = req.body
 	const user = await User.findOne({ username }).lean()

 	if (!user) {
 		return res.json({ status: 'error', error: 'Invalid username/password' })
 	}

 	if (await bcrypt.compare(password, user.password)) {
 		 //the username, password combination is successful
        console.log("successful login")
 		const token = jwt.sign(
 			{
 				id: user._id
 			},
 			JWT_SECRET,
             {
                expiresIn: maxAge
              }
 		)

         res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
         return res.json({ status: 'ok'})
 	}

 	res.json({ status: 'error', error: 'Invalid username/password' })
 })

 module.exports = app;