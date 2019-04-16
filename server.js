"use strict";

require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const PostModel = require('./PostModel');
const post = new PostModel();

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
  post.getAll()
    .then(data => handleResponse(res, data))
    .catch(err => console.log(err));
});

app.get('/posts/:id', (req, res) => {
  post.get(req.params.id)
    .then(data => handleResponse(res, data))
    .catch(err => console.log(err));
});

app.post('/posts', (req, res) => {
  post.create(req.body.content)
    .then(data => handleResponse(res, data))
    .catch(err => console.log(err));
});

app.put('/posts', (req, res) => {
  const params = { 
    id: req.body.id, 
    content: req.body.content 
  };
  post.update(params)
    .then(data => handleResponse(res, data))
    .catch(err => console.log(err));
});

app.listen(port, () => {
  console.log(`Listening on localhost:${port}`);
});
