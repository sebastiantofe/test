const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: process.env.dbPassword,
    port: 5432,
});

function test (req, res, next) {
	const query = `
	SELECT title
	FROM film
	FETCH FIRST 5 ROW ONLY
	`;
	pool.connect((err, client, done) => {
		if (err) return next(err);

		client.query(query, (err, results) => {
			done();
			if (err) {
				console.log(err.stack);
			} else {
				for (let row of results.rows) {
					// console.log(row);
				}
				res.json(results.rows[0]);
			}
		});
	});
}