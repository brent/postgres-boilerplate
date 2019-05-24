"use strict";

const router = require('express').Router();
const handleResponse = require('./helpers').handleResponse;

router.get('/', (req, res) => {
  handleResponse(res, { 'message': 'OK' });
});

router.use('/posts', require('./posts'));
router.use('/users', require('./users'));

module.exports = router;
