const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const SALT_FACTOR = 10;


let userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    createdAt: { type: Date, default: Date.now },
    password: {type: String, required: true},
    email: { type: String, required: true}
});


let noop = function() {};
userSchema.pre('save', function(done) {
    let user = this;
    if (!user.isModified('password')) {
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) {return done(err); }
        bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
            if (err) {return done(err);}
            user.password = hashedPassword;
            done();
        });
    });
});

userSchema.methods.checkPassword = function(guess, done) {
    bcrypt.compare(guess, this.password, function(err, isMatch) {
      done(err, isMatch);
    });
  };

  userSchema.methods.name = function() {
    return this.username;
}
  


module.exports = mongoose.model('User', userSchema);