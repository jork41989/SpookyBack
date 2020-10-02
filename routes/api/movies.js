const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validateMovieInput = require('../../validation/movie');


router.post('/newMovie',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
  const { errors, isValid } = validateMovieInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newMovie = new Movie({
    title: req.body.title,
    poster_url: req.body.poster_url,
    movie_db_id: req.body.movie_db_id,
    category: req.body.category
  })

  newMovie.save()
    .then(movie => res.json(movie))
    .catch(err => res.json(err));

});



router.get('/:id', (req, res) => {
  Movie.findById(req.params.id)
    .then(movie => res.json(movie))
      .catch(err => 
        res.status(404).json({movienotfound: 'Movie not found with that id'}))
});