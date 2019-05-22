"use strict";

const db = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS || '',
    database: 'test',
  }
});

db.schema.hasTable('posts').then((exists) => {
  if (!exists) {
    return db.schema.createTable('posts', (t) => {
      t.increments('id').primary();
      t.text('content');
      t.timestamp('created_at').defaultTo(db.fn.now());
      t.timestamp('modified_at').defaultTo(db.fn.now());
    });
  }
});

module.exports = db;
