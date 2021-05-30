const Model = require('../models/model');
const Product = new Model('products');
const async = require('async');


exports.create_product = function(req, res) {

};


exports.show_all_products = async function(req, res) {

	let data = await Product.select('*')

	res.json({
		products: data.rows
	});
	return;	

};
