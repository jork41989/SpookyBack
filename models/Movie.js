const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MovieSchema = new Schema({
  Title: {
    type: String,
    required: true
  },
  Year: {
    type: String,
    required: true
  },
  Poster: {
    type: String,
    required: true
  },
  imdbID: {
    type: String,
    required: true
  },
  Genre: {
    type: String,
    required: true
  }
})

module.exports = Movie = mongoose.model('movie', MovieSchema);