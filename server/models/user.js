var mongoose = require('mongoose');

// create the user model
var User = mongoose.model('User', {
  name: {
    type: String,
    trim: true,
    minlength: 1,
    required: true
  },
  email: {
    type: String,
    minlength: 1,
    trim: true,
    required: true
  }
});

module.exports = {
  User
};
