const Model = require("../models/model");
const User = new Model("users");
const Role = new Model("roles");

const { body, validationResult } = require("express-validator");

exports.create_user = [
	body("document", "Document is too short or too long.")
		.trim()
		.isLength({ min: 1, max: 20 })
		.escape(),
	body("last_name", "Last name is too short or too long.")
		.trim()
		.isLength({ min: 1, max: 30 })
		.escape(),
	body("name", "Name is too short or too long.")
		.trim()
		.isLength({ min: 1, max: 30 })
		.escape(),
	body("role_name", "Invalid role name")
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
		// Get id for role
		const role_name = req.body.role_name;
		const roleClause = ` WHERE name = '${role_name}'`
		const role = await Role.select("id", roleClause);
		if(role.rowCount === 0) {
			res.json({
				message: "Role name does not exist"
			});
			return;
		};

		const role_id = role.rows[0].id;
		const doc = req.body.document;
		const last_name = req.body.last_name;
		const name = req.body.name;
		
		const columns = "document, last_name, name, roles_id";
		const values = `'${doc}', '${last_name}', '${name}', '${role_id}'`;

		try {
			const data = await User.insertOne(columns, values);
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

exports.delete_user = async function(req, res, next) {
	const userId = req.params.userId
	try {
		const data = await User.deleteById(userId);
		if(data.rows.length === 0) {
			res.json({
				message: "Could not found user with that id"
			});
			return;
		}

		res.status(200).json({
			message: "User deleted successfully",
			data: data.rows,
		});
		return;
	} catch (err) {
		next(err);
		return;
	}
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
