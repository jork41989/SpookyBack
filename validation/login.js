const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateUserInput(data) {
  let errors = {};

  data.email = validText(data.email) ? data.email : '';
  data.username = validText(data.username) ? data.username : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};