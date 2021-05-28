
const product = require('../models/addProductModel');

const comments = require('../models/comment');

const product_ctrl = {
    displayAllProducts: async (req, res) => {
        results = await product.find({});

        res.render('products', {
            title:'Products',
            items: results
        }); 
    },
    addtoCart: function(filter, update, callback) {
        product.updateOne(filter, inCart.append(update), function(error, result) {
            if(error) return callback(false);
            console.log('Document modified: ' + result.nModified);
            return callback(true);
        });
        
    },
    displayStoreProducts: async (req, res) => {
        results = await product.find({});

        res.render('view/store', {
            title:'Products',
            items: results

        }); 

    },
    displayLaptopPages: async (req, res) => {
        results = await product.find({tag:req.body.tag});
        comres = await comments.find({});

        res.render('view/laptopproduct', {
            title:'Products',
            items: results,
            comment: comres

            

        }); 

    }
    }


module.exports = product_ctrl;
