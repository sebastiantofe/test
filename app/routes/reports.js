const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');


// GET request to show daily sales
router.get('/daily', reportsController.get_daily_sales);

// GET request to show monthly sales
router.get('/monthly', reportsController.get_monthly_sales);

module.exports = router;