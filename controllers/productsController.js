const Model = require('../models/model');
const Product = new Model('products');
const { body, validationResult } = require('express-validator');


exports.create_product = [
	body('name', 'Name is too short or too long.').trim().isLength({ min: 1, max:30 }).escape(),
	body('description', 'Description is too short or too long.').trim().isLength({ min: 1, max:30}).escape(),
	async function(req, res, next) {

	// Extract the validation errors from a request.
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		res.json({
			error: errors.array()
		})
		return;
	}

	const name = req.body.name;
	const description = req.body.description;
	const price = req.body.price;

	const columns = 'name, description, price';
	const values = `'${name}', '${description}', ${price}`;

	try {
		const data = await Product.insertOne(columns, values);
		res.status(201).json({
			data: data.rows
		})
	} catch (err) {
			next(err);
			return
	  }


}];


exports.show_all_products = async function(req, res) {
	
	let data = await Product.select('*')

	res.json({
		products: data.rows
	});
	return;	

};
