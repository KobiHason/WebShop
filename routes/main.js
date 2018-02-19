var router = require('express').Router();
var User = require('../models/user');
var Product = require('../models/product');
var Category = require('../models/category');

var async = require('async');

function paginate(req, res, next) {

  var perPage = 9;
  var page = req.params.page;

  Product
    .find()
    .skip( perPage * page)
    .limit( perPage )
    .populate('category')
    .exec(function(err, products) {
      if (err) return next(err);
      Product.count().exec(function(err, count) {
        if (err) return next(err);
        res.render('main/product-main.ejs', {
          products: products,
          pages: count / perPage
        });
      });
    });
}



    var stream = Product.synchronize();
    var count = 0;



Product.createMapping(function(err, mapping) {
  if (err) {
    console.log("error creating mapping");
    console.log(err);
  } else {
    console.log("Mapping created");
    console.log(mapping);
  }
});

stream.on('data', function() {
  count++;
});

stream.on('close', function() {
  console.log("Indexed " + count + " documents");
});

stream.on('error', function(err) {
  console.log(err);
});






router.post('/search', function(req, res, next) {
  res.redirect('/search?q=' + req.body.q);
});

router.get('/search', function(req, res, next) {
  if (req.query.q) {
    Product.search({
      query_string: { query: req.query.q}
    }, function(err, results) {
      results:
      if (err) return next(err);
      var data = results.hits.hits.map(function(hit) {
        return hit;
      });




      res.render('main/search-result', {
        query: req.query.q,
        data: data
      });
    });
  }
});




router.get('/', function(req, res, next) {

  if (req.user) {    paginate(req, res, next);  }
   else {    res.render('main/home.ejs');  }
});


 router.get('/page/:page', function(req, res, next) {
   paginate(req,res,next);
 });




 router.get('/products/:id', function(req, res, next) {
   Product
     .find({ category: req.params.id })
     .populate('category')
     .exec(function(err, products) {
       if (err) return next(err);
       res.render('main/category', {
         products: products
       });
     });
 });



// This rout  work by id and will looking for idem by hes id
router.get('/product/:id', function(req, res, next) {
  Product.findById({ _id: req.params.id }, function(err, product) {
    if (err) return next(err);
    res.render('main/product', {
      product: product
    });
  });
});



module.exports = router;
