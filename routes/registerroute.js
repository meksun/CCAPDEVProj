const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
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

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}
	if (!fname || typeof fname !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}
	if (!mname || typeof mname !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!lname || typeof lname !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!address || typeof address !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!emailaddress || typeof emailaddress !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}





	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

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
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

module.exports = app;