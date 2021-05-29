const db = require('./db');

exports.isAdmin = function(req, res, next){
	
	

	console.log(req.header('Auth'));
	console.log(req.headers)
	next();
};