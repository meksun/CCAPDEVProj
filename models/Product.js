//add routes

const express = require('express');
const Add = require('../models/addProductModel.js');
const router = express.Router();
const multer = require('multer');
const {checkUser} = require("../controllers/authMiddleware")

//define storage for the images

const storage = multer.diskStorage({
  //destination for files
  destination: function (request, file, callback) {
    callback(null, './public/uploads/images');
  },

  //add back the extension
  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

router.get('/new', (request, response) => {
  response.render('new');
});

//view route
router.get('/:slug', async (request, response) => {
  let add = await Add.findOne({ slug: request.params.slug });

  if (add) {
    response.render('show', { add: add });
  } else {
    response.redirect('/Product');
  }
});

//route that handles new post



//route to handle updates
router.put('/:id', async (request, response) => {
  request.add = await add.findById(request.params.id);
  let add = request.add;
  add.title = request.body.title;
  add.tag = request.body.tag,
  add.price = request.body.price;
  add.description = request.body.description;

  try {
    add = await add.save();
    //redirect to the view route
    response.redirect(`/Product/${add.slug}`);
  } catch (error) {
    console.log(error);
  
  }
});

///route to handle delete
router.delete('/:id', async (request, response) => {
  await Add.findByIdAndDelete(request.params.id);
  response.redirect('/Product');
});

router.post('/addToCart',checkUser,async (req, res) => {
	 
	 
  const userID = res.locals.user._id;
  const userCart = res.locals.user.inCart;

  
  

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

module.exports = router;
