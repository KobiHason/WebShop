var router = require('express').Router();

router.get('/' ,function(req ,res)
{
  res.render('main/home.ejs');
});


module.exports = router;
