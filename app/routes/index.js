const express = require('express');
const router = express.Router();
const db = require('../utils/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.send('index');
});

module.exports = router;
