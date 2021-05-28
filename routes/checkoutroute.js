const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const User = require("../models/users")
app.use(bodyParser.json())
const { checkUser } = require('../controllers/authMiddleware');

app.get('/',(req,res)=>{
    res.render('view/checkout',{title:'Checkout'});
 });
 
 app.post('/',checkUser,async (req, res) => {
    const userID = res.locals.user._id;
    let user = await User.findOne({_id : userID})
    console.log(user.fname);
    const cart = user.inCart;
    const purchases = user.itemsBought;
    var newpurchases = [purchases];

    for(i = 0; i < cart.length;i++)
    {
        try{
            const response = await User.updateOne(
                       { _id: userID },
                  { $push: {
                    itemsBought: cart[i]
              }
            }
            )
            
            console.log('User updated successfully: ', response)
        } catch (error) {
            
            throw error
        }
    }
    try {
        const response = await User.updateOne(
                   { _id: userID },
                       {
                        inCart:[]
                    }
            )
            
        console.log('User updated successfully: ', response)
      } catch (error) {
        
        throw error
      }
      
      res.json({ status: 'ok' })
    
    
 })
 

module.exports = app;
