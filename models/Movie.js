const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MovieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  poster_url: {
    type: String,
    required: true
  },
  movie_db_id: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
})

module.exports = Movie = mongoose.model('movie', MovieSchema);