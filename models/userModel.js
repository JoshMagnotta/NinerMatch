const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: {type: String, required: [true, 'first name is required']},
    lastName: {type: String, required: [true, 'last name is required']},
    email: {type: String, required: [true, 'email address is required'], unique: [true, 'this email address has been used'] },
    password: { type: String, required: [true, 'password is required'] }
});

userSchema.pre('save', async function (next) {
    try {
      if (!this.isModified('password')) {
        return next();
      }
  
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
      next();
    } catch (err) {
      next(err);
    }
  });
  

userSchema.methods.comparePassword = function(input){
    let user = this;
    return bcrypt.compare(input, user.password);
}

module.exports = mongoose.model('User', userSchema);