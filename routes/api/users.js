const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateUserInput = require('../../validation/login');

router.post('/login', (req, res) => {
  const {
    errors,
    isValid
  } = validateUserInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  // Check to make sure nobody has already registered with a duplicate email
    User.findOne({
      email: req.body.email
    })
      .then(user => {
       
        try{
          console.log(user)
          const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            admin: user.admin
          };
          jwt.sign(
            payload,
            keys.secretOrKey,
            // Tell the key to expire in one hour
            {
              expiresIn: 3600
            },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token,
                username: user.username,
                email: user.email,
                admin: user.admin
              });
              
            });
            
        } catch{
          const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            admin: false
          })
          newUser.save()
            .then(user => res.json(user))
        }
        
      })
})

module.exports = router;