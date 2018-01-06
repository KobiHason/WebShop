
var express     = require ('express');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');
var ejs         = require('ejs');
var engine      =require('ejs-mate');


var User = require('./models/user');
var app = express();





mongoose.connect('mongodb://root:123abc@ds239217.mlab.com:39217/onlinestore' , function(err){
  if (err){console.log(err);}
  else {console.log("Connected to DB ");}   });

//middleware


//bootstrap css and js files for express

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true } ));





// ejs files
app.engine('ejs' ,engine);
app.set('wiew engine' , 'ejs');

//routes to every ejs template

//
var mainRoutes =  require('./public/routes/main.js');
app.use(mainRoutes);
// var mainkRoutes =  require('./public/routes/maink.js');
// app.use(mainkRoutes);

//
//
 var userRoutes =  require('./public/routes/user.js');
 app.use(userRoutes);


// var mainRoutes = require('./routes/main');
// var userRoutes = require('./public/routes/users.');
//  app.use(usersRoutes);
// // app.use(mainRoutes);



app.listen(3000,function(err){
  if(err) throw err;
  else console.log("Server is Running on port 3000");
});
