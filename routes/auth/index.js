"use strict";

const router = require('express').Router();
const User = require('../../models/User');
const Token = require('../../models/Token');
const handleResponse = require('../routeHelpers').handleResponse;
const requireAuth = require('./authHelpers').requireAuth;

router.post('/signup', (req, res) => {
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  User.create(user).then(user => {
    Token.saveTokenForUser(user.id)
      .then((refreshToken) => {
        const jwt = Token.generateAccessToken(user);
        const data = {
          user,
          'access': jwt,
          'refresh': refreshToken,
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

  User.comparePassword(user).then(user => {
    Token.findTokenForUser(user.id)
      .then((refreshToken) => {
        const jwt = Token.generateAccessToken(user);
        const data = {
          user,
          'access': jwt,
          'refresh': refreshToken,
        };

        handleResponse(res, data);
      })
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
});

router.post('/token', (req, res) => {
  const userId = req.body.userId;
  const oldRefreshToken = req.body.refreshToken;

  Token.updateRefreshToken(userId, oldRefreshToken)
    .then((newRefreshToken) => {
      const jwt = Token.generateAccessToken({ id: userId, username: null});
      const data = {
        'access': jwt,
        'refresh': newRefreshToken,
      };

      handleResponse(res, data);
    })
    .catch(err => console.log(err))
});

module.exports = router;
