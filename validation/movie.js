const Validator = require('validator');
const validText = require('./valid-text');


module.exports = function validateMovieInput(data) {
  let errors = {};


  data.title = validText(data.title) ? data.title : '';
  data.category = validText(data.category) ? data.category : '';
  data.poster_url= validText(data.poster_url) ? data.poster_url : '';
  data.movie_db_id = validText(data.movie_db_id) ? data.movie_db_id : '';

  if (!Validator.isLength(data.title, { min: 2, max: 50 })) {
    errors.title = 'Title must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  if (Validator.isEmpty(data.movie_db_id)) {
    errors.movie_db_idn = 'movie_db_id field is required';
  }

  if (Validator.isEmpty(data.poster_url)) {
    errors.poster_url = 'Poster_url field is required';
  }

  if (Validator.isEmpty(data.category)) {
    errors.category = 'Category field is required';
  }



  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};