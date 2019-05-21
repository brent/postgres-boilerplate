"use strict";

const router = require('express').Router();
const Post = require('../../models/Post');
const handleResponse = require('../helpers').handleResponse;

router.get('/', (req, res) => {
  Post.getAll()
    .then(data => handleResponse(res, data))
    .catch(err => console.log(err));
});

router.get('/:id', (req, res) => {
  Post.get(req.params.id)
    .then(data => handleResponse(res, data))
    .catch(err => console.log(err));
});

router.post('/', (req, res) => {
  Post.create(req.body.content)
    .then(data => handleResponse(res, data))
    .catch(err => console.log(err));
});

router.put('/:id', (req, res) => {
  const params = { 
    id: req.params.id, 
    content: req.body.content 
  };

  Post.update(params)
    .then(data => handleResponse(res, data))
    .catch(err => console.log(err));
});

module.exports = router;
