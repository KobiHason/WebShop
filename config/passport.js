var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

// serialize == saving the data where we want
//& this part is rap the info in to object \
passport.serializeUser(function(user, done)
 {  done(null, user._id);    });
//deserializeUser go to DB look & retrive the info we search
passport.deserializeUser(function(id, done)
{  User.findById(id, function(err, user) {  done(err, user);  });   });



//Making temp object & moving the info& request to DB & Validate
//email not Found flash(message), email Fount -->check the pass
//Pass Not Good flash(message) Pass Good -->return (NULL & object)  Null=no error
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true     },

function(req, email, password, done) {
  User.findOne({ email: email}, function(err, user) {
    if (err) return done(err);

    if (!user) {
      return done(null, false, req.flash('loginMessage', 'No user has been found'));
    }

    if (!user.comparePassword(password)) {
      return done(null, false, req.flash('loginMessage', 'Oops! Wrong Password pal'));
    }

    return done(null, user);
  });
}));


//Validate= determines if You are log-in or not
exports.isAuthenticated = function(req, res, next)
{  if (req.isAuthenticated()) {    return next();  }
     res.redirect('/login');      }
