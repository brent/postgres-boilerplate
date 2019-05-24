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
    return db.schema
      .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
      .createTable('posts', (t) => {
        t.uuid('id').notNullable().primary().defaultTo(db.raw("uuid_generate_v4()"));
        t.text('content').notNullable();
        t.timestamp('created_at').defaultTo(db.fn.now());
        t.timestamp('modified_at').defaultTo(db.fn.now());
      }
    );
  }
});

db.schema.hasTable('users').then((exists) => {
  if (!exists) {
    return db.schema
      .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
      .createTable('users', (t) => {
        t.uuid('id').notNullable().primary().defaultTo(db.raw("uuid_generate_v4()"));
        t.text('username').notNullable().unique();
        t.text('email').notNullable().unique();
        t.text('password').notNullable();
        t.timestamp('created_at').defaultTo(db.fn.now());
        t.timestamp('modified_at').defaultTo(db.fn.now());
      }
    );
  }
});

module.exports = db;
