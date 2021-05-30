const Model = require("../models/model");
const User = new Model("users");
const Role = new Model("roles");

const { body, validationResult } = require("express-validator");

exports.create_user = function(req, res) {

};

exports.add_new_role = [
	body("name", "Name  for role is too short or too long.")
		.trim()
		.isLength({ min: 1, max: 30 })
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


		const name = req.body.name;

		const columns = "name";
		const values = `'${name}'`;

		try {
			const data = await Role.insertOne(columns, values);
			res.status(201).json({
				data: data.rows,
			});
			return;
		} catch (err) {
			next(err);
			return;
		}
	},
];

exports.edit_user_role = function(req, res) {

};

exports.delete_user = function(req, res) {

};

exports.show_all_users = async function(req, res, next) {
	
	try {
		const data = await User.select('*');
		res.status(200).json({
			data: data.rows
		});
	} catch (err) {
		next(err);
		return;
	}	

};
