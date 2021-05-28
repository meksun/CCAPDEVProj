
const express = require('express');
const router = express.Router();
const { checkUser } = require('../controllers/authMiddleware');
const bodyParser = require('body-parser')
router.use(bodyParser.json())
const Rating = require('../models/RatingModel.js');
const User = require('../models/users');



router.get("/",checkUser, async (req,res)=>{
  let user = res.locals.user.username
  let reviews = await Rating.find({user:user});
  res.render('review',{title:'Review', reviews:reviews});
})






module.exports = router;
