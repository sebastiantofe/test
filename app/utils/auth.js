const db = require('./db');

exports.authorize = function(req, res, next) {

	if(req.header('auth') === undefined) {
		res.status(401).json({
			message: 'You are unauthorized'
		});
		return
	} else {

		const userId = req.header('auth');
		const query = `
			SELECT u.id, last_name, u.name, r.name AS role
			FROM users u, roles r
			WHERE u.id = '${userId}' AND u.roles_id =r.id
		`;

		db.pool.connect((err, client, done) => {
			if (err) return next(err);
	
			client.query(query, (err, results) => {
				done();
				if (err) {
					console.log(err);
				} else if (results.rows.length === 0) {
					res.status(401).json({
						message: 'User does not exist'
					});
				} else {
					req.user = results.rows[0];
					next();
					return;
				}
			});
		});
	}
};


exports.isAdmin = function(req, res, next){

	if(req.user.role === 'admin'){
		next();
		return
	} else {
		res.status(403).json({
			message: 'You are not admin'
		});
		return;
	}
};