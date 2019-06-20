"use strict";

const router = require('express').Router();
const handleResponse = require('./routeHelpers').handleResponse;
const requireAuth = require('./auth/authHelpers').requireAuth;

router.get('/', (req, res) => {
  handleResponse(res, { 'message': 'OK' });
});

router.use('/auth', require('./auth'));
router.use('/posts', requireAuth, require('./posts'));
router.use('/users', requireAuth, require('./users'));

module.exports = router;
