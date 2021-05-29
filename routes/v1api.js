const express = require('express');
const router = express.Router();

router.get('/v1', function(req, res, next) {
	res.send('v1');
});

module.exports = router;