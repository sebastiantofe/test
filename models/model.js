const { pool } = require("../utils/db");

class Model {

	constructor(table) {
		this.pool = pool;
		this.table = table;
		this.pool.on(
			"error",
			(err, client) => `Error, ${err}, on idle client${client}`
		);
	}

	async select(columns, clause) {
		let query = `SELECT ${columns} FROM ${this.table}`;
		if (clause) query += clause;

		return this.pool.query(query);
	}

	async insertOne(columns, values) {
		let query = `
            INSERT INTO ${this.table}(${columns})
            VALUES (${values})
            RETURNING *
            `;
		return this.pool.query(query);
	}

    /**
     * Description. Adds new role in roles table.
     * 
     * @param {string}     id   - id of sale to edit.
     * @param {[string]}   columns - Array of names of columns to edit.
     * @param {[string]}   values - Array of values of columns to edit.
     *
     * @return {[string]} Returns sale data after the update.
     */
	async updateOne(id, columns, values) {
		let query = `UPDATE ${this.table}
            SET 
        `;
        for(let i = 0; i < columns.length; i++) {
            query+= `${columns[i]} = '${values[i]}',\n`
        };
        query = query.slice(0, -2);
        query += ` 
        WHERE id = '${id}'
        RETURNING *
        `;

        return this.pool.query(query);
	}
}

module.exports = Model;
