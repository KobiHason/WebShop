
var express = require ('express');
var morgan = require('morgan');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://root:123abc@ds239177.mlab.com:39177/webshop' , function(err){
  if (err){console.log(err);}
  else {console.log("Connected to DB ");}   });

//middleware
 app.use(morgan('dev'));




app.get('/' , function(req , res ){
var name ="kobi";  res.json("Hello "+ name); });


app.get('/catman' , function(req , res ){
 res.json("Iron man "); });



app.listen(3000,function(err){
  if(err) throw err;
  else console.log("Server is Running on port 3000");
});
