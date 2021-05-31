const { Pool } = require('pg');
// const products = require('../docs/products.json');
const async = require('async');
let retries = 5;
let pool;
while(retries) {

  try {

	 pool = new Pool({
	    user: 'postgres',
	    host: process.env.DB_HOST,
	    database: 'test',
	    password: process.env.DB_PASSWORD,
	    port: process.env.DB_PORT,
	});
	break;
  } catch(err) {
    (async() => {

    console.log(err);
    retries-=1;
    console.log(`retries left: ${retries}`)
      await new Promise(res => setTimeout(res, 4000));
     })();
  }
}

/*
* RUN IN psql

* - Create database command
* 		CREATE DATABASE test;
*
* - Add extension for generating uuid
* 		CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
*
* DUMP DATABASE command in CMD
* pg_dump -U postgres -p 5555 test > test_dump.sql
*/

/* FUNCTION CALLS
* createTables();
* insertFakeData(products);
* createInitialRoles();
* createAdminUser();
* 
*/

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
		function rolesTable(callback) {

			const query = `
				CREATE TABLE IF NOT EXISTS roles (
					id uuid DEFAULT uuid_generate_v4(),
					name VARCHAR(30) UNIQUE NOT NULL,
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
		function productsTable(callback) {

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


function insertFakeData (products) {
	let query = `
		INSERT INTO products (id, name, description, price)
		VALUES 
	`;
	for(let i = 0; i < products.length; i++) {
		query+= `('${products[i].id}', '${products[i].name}', '${products[i].description}', ${products[i].price}),\n`
	};
	query = query.slice(0, -2);

	pool.connect((err, client, done) => {
		if (err) return next(err);

		client.query(query, (err, results) => {
			done();
			if (err) {
				console.log(err);
			}
		});
	});

};

function createInitialRoles() {

	const query = `
		INSERT INTO roles (name)
		VALUES ('admin'),
		('employee'),
		('user')
		RETURNING id;
	`;
	pool.connect((err, client, done) => {
		if (err) return next(err);

		client.query(query, (err, results) => {
			done();
			if (err) {
				console.log(err);
			} else {
				console.log(results.rows);
			}
		});
	});

};

function createAdminUser() {
	
	// Query to get the id for admin role
	const idQuery = `
		SELECT id
		FROM roles
		WHERE name = 'admin'
	`;

	pool.connect((err, client, done) => {
		if (err) return next(err);

		client.query(idQuery, (err, results) => {
			if (err) {
				console.log(err);
			} else {
				console.log(results.rows[0].id);
				const adminId = results.rows[0].id;
				const query = `
					INSERT INTO users(document, last_name, name, roles_id)
					VALUES (1010101010, 'Torrado', 'Sebastian', '${adminId}')
				`;

				client.query(query, (err) => {
					done();
					if (err) {
						console.log(err);
					};
				})
			}
		});
	});


};


/**
 * Description. Adds new role in roles table.
 * 
 * @param {string}   role - Name of the role to create.
 *
 * @return {string} Returns role id after created.
 */
function createRole(role) {
	const query = `
		INSERT INTO roles(name)
		VALUES ('${role}')
		RETURNING id
	`;

	pool.connect((err, client, done) => {
		if (err) return next(err);

		client.query(query, (err, results) => {
			done();
			if (err) {
				console.log(err);
				return;
			} else {
				console.log(results.rows[0].id);
				return results.rows[0].id
			}
		});
	});
};


module.exports = {
	pool,
	createRole
}
