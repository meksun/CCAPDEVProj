const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const path = require('path')
const bcrypt = require('bcryptjs')

const User = require('../models/users.js');
app.get('/',(req,res)=>{
	res.render('view/register',{title:'Register'});
 });
app.post('/',async (req, res) => {
	const { username, 
		fname,
		mname,
		lname,
		password: plainTextPassword ,
		address,
		emailaddress,
		inCart, 
		itemsBought,
	} = req.body

	

	if(await User.findOne({username:username}))
	return res.json({ status: 'error', error: "User Name taken" })
	

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)

	try {
		const response = await User.create({
			username, 
			fname,
			mname,
			lname,
			password,
			address,
			emailaddress,
			inCart,
			itemsBought,
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Duplicate Key' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

module.exports = app;