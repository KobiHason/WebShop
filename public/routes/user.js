var router = require('express').Router();
 // var User = require('../models/user.js');





router.get('/singup');

//making new user if not exist
router.post('/singup' , function (req ,res,next) {
  var user =new User();
// user.profile.name = req.body.name;
user.firstname = req.body.firstname;
user.lastname = req.body.lastname;
user.password = req.body.password;
user.email = req.body.email;
User.findOne( {email : req.body.email}

  , function(err , existingUser){
  if (existingUser)  {
    console.log(req.body.email + " is already exist");
     return res.redirect('/singup');
                     }

  else
  {
    user.save(function(err,user)               {
     if (err) return next(err);
    res.json('New user has beem created');
                                                });
  }

});
});




module.exports = router;



// module.exports = router;
//
// // old one lerning exmple
// router.post('/singup' , function (req ,res,next){
//   var user =new User();
// // user.profile.name = req.body.name;
// user.firstname = req.body.firstname;
// user.lastname = req.body.lastname;
// user.password = req.body.password;
// user.email = req.body.email;
//
// user.save(function(err){
//   if (err) return next(err);
//   res.json('Successfully created new user');
// });
// });
