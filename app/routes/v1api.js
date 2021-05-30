const express = require('express');
const router = express.Router();

const salesRouter = require('./sales');
const productsRouter = require('./products');
const usersRouter = require('./users');
const reportsRouter = require('./reports');
const auth = require('../utils/auth');

router.use('/sales', salesRouter);

router.use('/products', productsRouter);

router.use('/users', auth.isAdmin, usersRouter);

router.use('/reports', auth.isAdmin, reportsRouter);


router.get('/', function(req, res, next) {
	res.json('v1 API Documentation');
});

module.exports = router;