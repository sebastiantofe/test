const express = require('express');
const router = express.Router();
const auth = require('../utils/auth.js');
const productsController = require('../controllers/productsController');

// POST request for creating a new product
router.post('/', auth.isAdmin, productsController.create_product);

// GET request to show all products
router.get('/', productsController.show_all_products);

module.exports = router;