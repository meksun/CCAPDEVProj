
 const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const bcrypt = require('bcryptjs')
const control = require("../controllers/user_ctrl");
const { checkUser } = require('../controllers/authMiddleware');
const User = require('../models/users');



app.get('/',(req,res)=>{
	res.render('view/edit-account',{title:'Edit Account'});
 });
 app.post('/',checkUser,async (req, res) => {
	 
	 
    const userID = res.locals.user._id;
	const { 
		fname,
		mname,
		lname,
		password:plainTextPassword,
		address,
		emailaddress,
	} = req.body

    const update = {};

	if (fname) {
		update.fname = fname;
	}
	if (mname) {
		update.mname = mname;
	}

	if (lname) {
		update.lname = lname;
	}
   
        if(plainTextPassword)
         	if (plainTextPassword.length < 5) {
         		return res.json({
         			status: 'error',
         			error: 'Password too small. Should be atleast 6 characters'
         		})
        	}
        else{

            		
            		const password = await bcrypt.hash(plainTextPassword, 10)
                    update.password = password;
        }

	if (address) {
		update.address = address;
	}

	if (emailaddress) {
		update.emailaddress = emailaddress;
	}


	try {
		const response = await User.updateOne(
           		{ _id: userID },
             			update
        )
        
		console.log('User updated successfully: ', response)
	} catch (error) {
		
		throw error
	}

	res.json({ status: 'ok' })
})
app.post('/deleteAcc',async(req,res)=>{
	const { 
		userID
	} = req.body
console.log(userID)
	await User.deleteOne({_id:userID})
 });

module.exports = app;