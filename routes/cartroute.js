const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const product = require("../models/addProductModel")
router.use(bodyParser.json())
const { checkUser } = require('../controllers/authMiddleware');

const User = require('../models/users.js')


function containsProduct(prod, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].title === prod) {
            return i+1;
        }
    }

    return 0;
}
router.get('/:slug/delete',checkUser, async (request, response) => {
  console.log(request.params.slug)
  let prod = await product.findOne({ slug: request.params.slug });
  let user = response.locals.user;

  await User.updateOne({username:user.username},{$pull: { 'inCart': prod.title }
  })
  response.redirect("/cart")
  
	 

});
 router.get('/',checkUser,async (req, res) => {
    const cart = res.locals.user.inCart;
    var combinedcost = 0;
    let user = res.locals.user;
    const cartItems = []
    for(i = 0; i < cart.length;i++)
    {
      let item = await product.findOne({title:cart[i]})
      if(item)
      {

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
          slug:item.slug,
          totalcost:item.price
      })}}
      else
      {
        await User.updateOne({username:user.username},{$pull: { 'inCart': cart[i] }
      })
    }
      
    }
    for(i = 0; i < cartItems.length;i++)
    {
       combinedcost += cartItems[i].totalcost
    }
    res.render('cart',{items:cartItems, total:combinedcost});
	 

	
})
router.post('/', checkUser, async (req, res) => {
    const userID = res.locals.user._id;
    const {
        title
    }=req.body
   console.log(title);
    res.redirect('/cart');
  });

module.exports = router;