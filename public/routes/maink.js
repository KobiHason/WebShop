var router = require('express').Router();



router.get('/' ,function(req ,res){
  res.render('main/home.ejs');
});

router.get('/about' ,function(req ,res){
  res.render('views/home.ejs');
});


module.exports = router;
