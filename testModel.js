"use strict";

const db = require('./db');

class testModel {
  constructor() {
    this.table = 'test1';
  }

  getAll() {
    return new Promise((resolve, reject) => {
      db
        .orderBy('id')
        .from(this.table)
        .then(rows => {
          resolve(rows);
        })
        .catch(err => {
          reject(err)
        });
    });
  }

  get(id) {
    return new Promise((resolve, reject) => {
      db
        .first()
        .from(this.table)
        .where('id', '=', id)
        .then(rows => {
          resolve(rows);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  create(record) {
    return new Promise((resolve, reject) => {
      db
        .insert({
          content: record
        })
        .into(this.table)
        .returning('*')
        .then(rows => {
          resolve(rows[0]);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  update(params) {
    const { id, content } = params;
    return new Promise((resolve, reject) => {
      db
        .from(this.table)
        .where('id', '=', id)
        .update({
          content: content
        })
        .returning('*')
        .then(rows => {
          resolve(rows[0]);
        })
        .catch(err => {
          reject(err)
        });
    });
  }
}

module.exports = testModel;
