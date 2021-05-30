const { pool } = require('../utils/db');

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on('error', (err, client) => `Error, ${err}, on idle client${client}`);
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
      RETURNING id, ${columns}
    `;
    return this.pool.query(query);
  }
}

module.exports = Model;