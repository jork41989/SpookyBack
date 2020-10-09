const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validateMovieInput = require('../../validation/movie');

const Movie = require('../../models/Movie');

router.post('/newMovie',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
  const { errors, isValid } = validateMovieInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Movie.findOne({
    imdbID: req.body.imdbID
  })
  .then(movie =>{
    if(movie){
      return res.status(400).json({
        movie: "This movie has already been added!"
      })
    } else {
      const newMovie = new Movie({
        Title: req.body.Title,
        Year: req.body.Year,
        Poster: req.body.Poster,
        imdbID: req.body.imdbID,
        Genre: req.body.Genre
      })

      newMovie.save()
        .then(movie => res.json(movie))
        .catch(err => res.json(err));
    }
  })
  

});

router.get("/randomSpook", (req, res) =>{
  Movie.aggregate([{
      "$sample": {
        size: 1
      }
    }])
    .then(movie=> res.json(movie))
      .catch(err =>
          res.status(404).json({movieRandom: "Random brokes"}))
})



router.get('/:id', (req, res) => {
  Movie.findById(req.params.id)
    .then(movie => res.json(movie))
      .catch(err => 
        res.status(404).json({movienotfound: 'Movie not found with that id'}))
});


module.exports = router;