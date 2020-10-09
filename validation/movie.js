const Validator = require('validator');
const validText = require('./valid-text');


module.exports = function validateMovieInput(data) {
  let errors = {};


  data.Title = validText(data.Title) ? data.Title : '';
  data.Year = validText(data.Year) ? data.Year : '';
  data.Genre = validText(data.Genre) ? data.Genre : '';
  data.Poster = validText(data.Poster) ? data.Poster : '';
  data.imdbID = validText(data.imdbID) ? data.imdbID : '';

  if (!Validator.isLength(data.Title, { min: 2, max: 50 })) {
    errors.Title = 'Title must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.Title)) {
    errors.Title = 'Title field is required';
  }

  if (Validator.isEmpty(data.imdbID)) {
    errors.imdbID = 'imdbID field is required';
  }

  if (Validator.isEmpty(data.Poster)) {
    errors.Poster = 'Poster_url field is required';
  }

  if (Validator.isEmpty(data.Genre)) {
    errors.Genre = 'Genre field is required';
  }



  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};