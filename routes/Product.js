//add routes

const express = require('express');
const Add = require('../models/addProductModel.js');
const router = express.Router();
const multer = require('multer');
const { checkUser } = require('../controllers/authMiddleware');
const bodyParser = require('body-parser')
router.use(bodyParser.json())
const Rating = require('../models/RatingModel.js');
const User = require('../models/users');


router.get('/', async (request, response) => {
  let Product = await Add.find().sort({ timeCreated: 'desc' });
  response.render('products', { Product: Product });
});



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
  let ratings = await Rating.find({ product: request.params.slug });
  if (add) {
    response.render('show', { add: add, ratings : ratings});
  } else {
    response.redirect('/'); 
  }
});
router.post('/:slug/addtocart',checkUser, async (req, res) => {
  

  const userID = res.locals.user._id;
  
  const { 
		title
	} = req.body
  
	try{
		const response = await User.updateOne(
           		{ _id: userID },
              { $push: {
                inCart: title
          }
        }
        )
        
		console.log('User updated successfully: ', response)
	} catch (error) {
		
		throw error
	}

	res.json({ status: 'ok' })
});
router.post('/:slug/review',checkUser, async (req, res) => {
  const uName = res.locals.user.username;
  
  const { 
		review, stars, product,title
	} = req.body
  
	try{
		const response = await Rating.updateOne(
           		{ user:uName },
              { 
                user:uName, stars:stars, product:product, comment:review, title:title
              },
              { upsert : true }
        )
        
		console.log('Review Added Successfully ', response)
	} catch (error) {
		
		throw error
	}

	res.json({ status: 'ok' })
});

router.post('/:slug/delrev',checkUser, async (req, res) => {
  const uName = res.locals.user.username;
  
  const { 
		product,title
	} = req.body
  
	try{
		const response = await Rating.deleteOne(
           		{ user:uName, product:product, title:title }
        )
        
		console.log('Review Deleted Successfully ', response)
	} catch (error) {
		
		throw error
	}

	res.json({ status: 'ok' })
});

//route that handles new post
router.post('/', upload.single('image'), async (request, response) => {
  console.log(request.file);
  let add = new Add({
    title: request.body.title,
    price: request.body.price,
    tag:request.body.tag,
    description: request.body.description,
    img: request.file.filename,
  });

  try {
    add = await add.save();

    response.redirect(`Product/${add.slug}`);
  } catch (error) {
    console.log(error);
  }
});


router.get('/edit/:id', async (request, response) => {
  let add = await Add.findById(request.params.id);
  response.render('edit', { add: add });
});

//route to handle updates
router.put('/:id', async (request, response) => {
  request.add = await Add.findById(request.params.id);
  let add = request.add;
  add.title = request.body.title;
  add.price = request.body.price;
  add.description = request.body.description;

  try {
    add = await add.save();
    //redirect to the view route
    response.redirect(`/Product/${add.slug}`);
  } catch (error) {
    console.log(error);
    response.redirect(`/Product/edit/${add.id}`, { add: add });
  }
});


///route to handle delete
router.delete('/:id', async (request, response) => {
  await Add.findByIdAndDelete(request.params.id);
  response.render('/');
});



module.exports = router;
