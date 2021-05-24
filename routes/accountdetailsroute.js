const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const product = require("../models/addProductModel")
app.use(bodyParser.json())
const { checkUser } = require('../controllers/authMiddleware');


function containsProduct(prod, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].title === prod) {
            return i+1;
        }
    }

    return 0;
}
 app.get('/',checkUser,async (req, res) => {
    const cart = res.locals.user.itemsBought;
    var combinedcost = 0;
    const cartItems = []
    for(i = 0; i < cart.length;i++)
    {
      let item = await product.findOne({title:cart[i]})

      if(containsProduct(item.title,cartItems))
      {
        cartItems[containsProduct(item.title,cartItems)-1].quantity +=1;
        cartItems[containsProduct(item.title,cartItems)-1].totalcost += item.price;
      }
      else
      {cartItems.push({
          title:item.title,
          price:item.price,
          img:item.img,
          quantity:1,
          totalcost:item.price
      })}
      
    }
    for(i = 0; i < cartItems.length;i++)
    {
       combinedcost += cartItems[i].totalcost
    }
    res.render('view/account-details',{items:cartItems, total:combinedcost});
	 

	
})

module.exports = app;