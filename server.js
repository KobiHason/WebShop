var express      = require('express');
var morgan       = require('morgan');
var mongoose     = require('mongoose');
var bodyParser   = require('body-parser');
var ejs          = require('ejs');
var engine       = require('ejs-mate');
var session      = require('express-session');
var cookieParser = require('cookie-parser');
var flash        = require('express-flash');
var MongoStore   = require('connect-mongo/es5')(session);
var passport     = require('passport');
var secret       = require('./config/secret');
var User        = require('./models/user');
var Category    = require('./models/category');

var app = express();




// redirect to config->secret.js and holding the port and DB link
mongoose.connect(secret.database, function(err) {
  if (err) {    console.log(err);  }
  else { console.log("Connected to the database"); }
});



// Middleware
app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
  resave: true,     saveUninitialized: true,    secret: secret.secretKey,
  store: new MongoStore({ url: secret.database, autoReconnect: true})         }));

app.use(flash());

app.use(passport.initialize());

app.use(passport.session());

app.use(function(req, res, next)
{  res.locals.user = req.user;    next();    });


// items categories
  app.use(function(req, res, next) {
    Category.find({}, function(err, categories) {
      if (err) return next(err);
      res.locals.categories = categories;
      next();
    });
  });




// EJS templates
app.engine('ejs', engine);
app.set('view engine', 'ejs');





// routes
var adminRoutes = require('./routes/admin');
var mainRoutes  = require('./routes/main.js');
var userRoutes  = require('./routes/user.js');
var apiRoutes   = require('./api/api.js');
app.use(adminRoutes);
app.use(mainRoutes);
app.use(userRoutes);
app.use('/api', apiRoutes);




app.listen(secret.port, function(err) {
  if (err) throw err;
  console.log("The server is up and running on  port  " + secret.port);
});
