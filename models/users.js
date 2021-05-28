const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		fname: { type: String, required: true },
		mname: { type: String, required: true },
		lname: { type: String, required: true },
		address: { type: String, required: true },
		emailaddress: { type: String, required: true },
		password: { type: String, required: true },
		inCart: { type: Array, required: true },
		itemsBought: { type: Array, required: true },

	},
	{ collection: 'users' }
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model