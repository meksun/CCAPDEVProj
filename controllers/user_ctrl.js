const Users = require('../models/users.js');
const db = require('../models/db.js');
const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    getAdd: function(req, res) {
        
        var uname = req.body.uname;
        var fname = req.body.fname;
        var mname = req.body.mname;
        var lname = req.body.lname;
        var password = req.body.password;
        var address = req.body.address;
        var emailaddress = req.body.emailaddress;
        var inCart = [];
        var itemsBought = [];
        
         var users = {
        uname: uname,
        fname:fname,
        mname: mname,
        lname:lname,
        password:password,
        address: address,
        emailaddress:emailaddress,
        inCart:inCart,
        itemsBought:itemsBought,
    }

    
        Users.create(users, function(error, result) {
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        } )
    
}
}


module.exports = controller;
