const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { requireAuth, checkUser } = require('./controllers/authMiddleware');
const cookies = require("cookie-parser");
dotenv.config();
const dbUri = process.env.SERVER_DB_URI;
const options = {
   useUnifiedTopology: true,
   useNewUrlParser: true,
   useCreateIndex: true
};
const methodOverride = require('method-override');

const path = require('path');
const registration = require('./routes/registerroute.js')
const login = require('./routes/loginroute.js');
const logout = require('./routes/logoutroute.js');
const editaccount = require("./routes/editaccountroute.js")
const accountdetaills = require("./routes/accountdetailsroute")
const Product = require('./routes/Product.js');
const addRouter = require('./routes/Product.js');
const addProduct = require('./models/addProductModel');
const store = require('./routes/storeroute');
const cart = require("./routes/cartroute")
const checkout = require("./routes/checkoutroute")
const app = express();

app.use(cookies());
mongoose.connect(dbUri, options, (err) => {
   console.log(err? err : 'Established connection with mongodb');
});


app.get('*',checkUser);
app.use('*',checkUser);

app.set('views', path.join(__dirname,'views/view'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));
app.listen(3000);


app.use('/Product', Product);


app.use(express.static('public'));

  app.use(morgan('dev'));

  app.get('/',(req,res)=>{
    res.render('index',{title:'Home'});
 });


app.get('/about',(req,res)=>{
    res.render('about',{title:'About'});
 });
 
app.use('/login',login);
app.use('/register', registration);
app.use('/logout',logout);
app.use('/edit-account',editaccount);
app.use('/Product', addRouter);
app.use("/cart",cart);
app.use("/checkout",checkout);
app.use('/account-details',accountdetaills);
// app.get('/products', product_ctrl.displayAllProducts);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
//route for the index

app.get('/products', async (request, response) => {
  let Product = await addProduct.find().sort({ timeCreated: 'desc' });
  response.render('products', { Product: Product });
});

app.use(express.static('public'));
app.use('/Product', addRouter);




app.get('/review',(req,res)=>{
   res.render('review',{title:'Review'});
});
app.get('/checkoutsuccess',(req,res)=>{
   res.render('checkoutsuccess',{title:'Checkout Success'});
});

 app.use((req,res)=>{
     res.status(404).render('404',{title:'404'});
 });
 