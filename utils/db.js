const { Pool } = require('pg');
const products = require('../docs/products.json');
const async = require('async');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: process.env.dbPassword,
    port: 5555,
});

/* 
* RUN IN psql

* - Create database command
* 		CREATE DATABASE test;
*
* - Add extension for generating uuid
* 		CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
*
*/

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
};

for(let i = 0; i < products.length; i++) {
	// console.log(products[i]);
};

function createTables () {

	async.parallel([
		function salesTable(callback) {

			const query = `
				CREATE TABLE IF NOT EXISTS sales (
					id uuid DEFAULT uuid_generate_v4(),
					products_id uuid REFERENCES products(id),
					qty INT NOT NULL,
					sale_at TIMESTAMP DEFAULT NOW(),
					users_id uuid REFERENCES users(id),
					PRIMARY KEY (id)
				);
			`;
			pool.connect((err, client, done) => {
				if (err) return next(err);
		
				client.query(query, (err, results) => {
					done();
					if (err) {
						console.log(err.stack);
					} else {
						console.log(`sales: ${results.rows}`);
					};
					callback(null);
				});
			});

		},
		function usersTable(callback) {

			const query = `
				CREATE TABLE IF NOT EXISTS users (
					document VARCHAR(20) UNIQUE NOT NULL,
					id uuid DEFAULT uuid_generate_v4(),
					last_name VARCHAR(30) NOT NULL,
					name VARCHAR(30) NOT NULL,
					roles_id uuid REFERENCES roles(id),
					PRIMARY KEY (id)
				);
			`;

			pool.connect((err, client, done) => {
				if (err) return next(err);
		
				client.query(query, (err, results) => {
					done();
					if (err) {
						console.log(err.stack);
					} else {
						console.log(`users: ${results.rows}`);
					};
					callback(null);
				});
			});
		},
		function roles(callback) {

			const query = `
				CREATE TABLE IF NOT EXISTS roles (
					id uuid DEFAULT uuid_generate_v4(),
					name VARCHAR(30) NOT NULL,
					PRIMARY KEY (id)
				);
			`;

			pool.connect((err, client, done) => {
				if (err) return next(err);
		
				client.query(query, (err, results) => {
					done();
					if (err) {
						console.log(err.stack);
					} else {
						console.log(`roles: ${results.rows}`);
					};
					callback(null);
				});
			});
		},
		function products(callback) {

			const query = `
				CREATE TABLE IF NOT EXISTS products (
					description VARCHAR(30) NOT NULL,
					id uuid DEFAULT uuid_generate_v4(),
					name VARCHAR(30) NOT NULL,
					price INT NOT NULL,
					PRIMARY KEY (id)
				);
			`;

			pool.connect((err, client, done) => {
				if (err) return next(err);
		
				client.query(query, (err, results) => {
					done();
					if (err) {
						console.log(err.stack);
					} else {
						console.log(`products: ${results.rows}`);
					};
					callback(null);
				});
			});
		}
	], function(err) {
		if(err) {return console.log(err)};
		console.log('done');
	});
};

createTables();

function insertFakeData (req, res, next) {
	
};

module.exports = {
	pool
}