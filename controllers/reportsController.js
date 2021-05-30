const { pool } = require("../utils/db");

const { body, validationResult } = require("express-validator");

exports.get_daily_sales =[
	body("date", "Date is in incorrect format.")
		.trim()
		.isDate()
		.isLength({ min: 10, max: 10 })
		.escape(),
	async function(req, res, next) {

		// Extract the validation errors from a request.
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.json({
				error: errors.array(),
			});
			return;
		}
	
	// date in format 'yyyy-mm-dd'
	const date = req.body.date;
	
	const query = `
		SELECT SUM(qty * price) AS daily_sales
		FROM sales s, products p 
		WHERE s.products_id = p.id 
		GROUP BY  sale_at::date 
		HAVING  sale_at::date = '${date}';
	`;
	
	try {
		const data = await pool.query(query);
		if(data.rowCount === 0){
			res.json({
				message: "No sales in this date"
			});
			return;
		}

		res.status(200).json({
			"message": `Total sales in ${date}`,
			sales: data.rows[0].daily_sales
		});
		return;
	} catch (err) {
		next(err);
		return;
	}
	
}];

exports.get_monthly_sales = function(req, res) {

	date_trunc('month',sale_at)

};