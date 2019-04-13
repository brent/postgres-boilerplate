"use strict";

require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const testModel = require('./testModel');
const test = new testModel();

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

app.get('/test', (req, res) => {
  test.getAll()
    .then(data => handleResponse(res, data))
    .catch(err => console.log(err));
});

app.get('/test/:id', (req, res) => {
  test.get(req.params.id)
    .then(data => handleResponse(res, data))
    .catch(err => console.log(err));
});

app.post('/test', (req, res) => {
  test.create(req.body.content)
    .then(data => handleResponse(res, data))
    .catch(err => console.log(err));
});

app.put('/test', (req, res) => {
  const params = { 
    id: req.body.id, 
    content: req.body.content 
  };
  test.update(params)
    .then(data => handleResponse(res, data))
    .catch(err => console.log(err));
});

app.listen(port, () => {
  console.log(`Listening on localhost:${port}`);
});
