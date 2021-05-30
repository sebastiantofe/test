const Model = require("../models/model");
const Sale = new Model("sales");

const { body, validationResult } = require("express-validator");

exports.create_sale = [
	body("products_id", "Invalid product_id.")
		.trim()
		.isLength({ min: 36, max: 36 })
		.escape(),
	body("qty", "Quantity must be greater than zero.")
		.trim()
		.isInt({ min: 1 })
		.escape(),
	async function (req, res, next) {
		// Extract the validation errors from a request.
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.json({
				error: errors.array(),
			});
			return;
		}


		const products_id = req.body.products_id;
		const qty = req.body.qty;
		const currentUserId = req.user.id;

		const columns = "products_id, qty, users_id";
		const values = `'${products_id}', ${qty}, '${currentUserId}'`;

		try {
			const data = await Sale.insertOne(columns, values);
			res.status(201).json({
				data: data.rows,
			});
		} catch (err) {
			next(err);
			return;
		}
	},
];

exports.edit_sale = [
	body("products_id", "Invalid product_id.")
		.trim()
		.isLength({ min: 36, max: 36 })
		.escape(),
	body("qty", "Quantity must be greater than zero.")
		.trim()
		.isInt({ min: 1 })
		.escape(),
	async function (req, res, next) {
		// Extract the validation errors from a request.
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.json({
				error: errors.array(),
			});
			return;
		}

		const products_id = req.body.products_id;
		const qty = req.body.qty;
		const currentUserId = req.user.id;
		const saleId = req.params.saleId;

		const columns = ["products_id", "qty", "users_id"];
		const values = [products_id, qty, currentUserId];

		try {
			const data = await Sale.updateOne(saleId, columns, values);
			res.status(200).json({
				data: data.rows,
			});
		} catch (err) {
			next(err);
			return;
		}
	},
];

exports.delete_sale = function (req, res) {};

exports.show_all_sales = async function (req, res, next) {
	try {
		const data = await Sale.select('*');
		res.status(200).json({
			data: data.rows,
		});
	} catch (err) {
		next(err);
		return;
	}	
};
