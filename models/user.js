
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var Schema = mongoose.Schema;


// email: { type: String, unique: true, lowercase: true},
// password: String,
// firstname:  String,
// lastname:  String,
// profile: {  picture: {type: String, default: ''} },

/* The user schema attributes / characteristics / fields */
var UserSchema = new Schema({

  email: { type: String, unique: true, lowercase: true},
  password: String,

  firstname:  String,
   lastname:  String,
  profile: {

    picture: { type: String, default: ''}
  },

  address: String,
  history: [{
    date: Date,
    paid: { type: Number, default: 0},
    // item: { type: Schema.Types.ObjectId, ref: ''}
  }]
});

/*Hashing the passsword  before moving to DB   */

UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});



/*Compare the passsword for validation in the DB  */
UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}



module.exports = mongoose.model('user' ,UserSchema );
