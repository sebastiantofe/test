const Model = require("../models/model");
const User = new Model("users");

const { body, validationResult } = require("express-validator");

exports.create_user = function(req, res) {

};

exports.add_new_role = function(req, res) {

};

exports.edit_user_role = function(req, res) {

};

exports.delete_user = function(req, res) {

};

exports.show_all_users = async function(req, res, next) {
	
	try {
		const data = await User.select('*');
		res.status(200).json({
			data: data.rows,
		});
	} catch (err) {
		next(err);
		return;
	}	

};
