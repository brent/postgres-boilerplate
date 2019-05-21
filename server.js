"use strict";

require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const Post = require('./PostModel');

const morgan = require('morgan');
const bodyParser = require('body-parser');

app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const handleResponse = function(res, data) {
  res.status(200).json({
    'status': 200,
    'data': data || { },
  });
};

app.get('/', (req, res) => {
  handleResponse(res, { 'message': 'OK' });
});

app.get('/posts', (req, res) => {
  Post.getAll()
    .then(data => handleResponse(res, data))
    .catch(err => console.log(err));
});

app.get('/posts/:id', (req, res) => {
  Post.get(req.params.id)
    .then(data => handleResponse(res, data))
    .catch(err => console.log(err));
});

app.post('/posts', (req, res) => {
  Post.create(req.body.content)
    .then(data => handleResponse(res, data))
    .catch(err => console.log(err));
});

app.put('/posts/:id', (req, res) => {
  const params = { 
    id: req.params.id, 
    content: req.body.content 
  };
  Post.update(params)
    .then(data => handleResponse(res, data))
    .catch(err => console.log(err));
});

app.listen(port, () => {
  console.log(`Listening on localhost:${port}`);
});
