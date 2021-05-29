const express = require('express');
const router = express.Router();
const auth = require('../utils/auth.js');
const salesController = require('../controllers/salesController');

// POST request for creating a new sale
router.post('/', salesController.create_sale);

// PUT request for editing sale
router.put('/:saleId', auth.isAdmin, salesController.edit_sale);

// Delete request for removing sale
router.delete('/:saleId', auth.isAdmin, salesController.delete_sale);

// GET request to show all sales
router.get('/', salesController.show_all_sales);

module.exports = router;