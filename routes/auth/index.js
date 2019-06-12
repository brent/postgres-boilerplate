"use strict";

const router = require('express').Router();
const handleResponse = require('../helpers').handleResponse;
const User = require('../../models/User');
const Token = require('../../models/Token');

router.post('/signup', (req, res) => {
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  User.create(user)
    .then(user => {
      const jwt = Token.generateAccessToken(user);

      Token.saveTokenForUser(user.id)
        .then((token) => {
          const data = {
            user,
            'accessToken': jwt,
            'refreshToken': token,
          };

          handleResponse(res, data);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.post('/login', (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  User.comparePassword(user)
    .then(user => {
      const jwt = Token.generateAccessToken(user);

      Token.findTokenForUser(user.id)
        .then(token => {
          const data = {
            user,
            'accessToken': jwt,
            'refreshToken': token,
          };

          handleResponse(res, data);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

/*
router.post('/token', (req, res) => {
});
*/

module.exports = router;
