"use strict";

const db = require('./db');
const tableName = 'posts';

class PostModel {
  static getAll() {
    return new Promise((resolve, reject) => {
      db
        .orderBy('id')
        .from(tableName)
        .then(rows => {
          resolve(rows);
        })
        .catch(err => {
          reject(err)
        });
    });
  }

  static get(id) {
    return new Promise((resolve, reject) => {
      db
        .first()
        .from(tableName)
        .where('id', '=', id)
        .then(rows => {
          resolve(rows);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static create(record) {
    return new Promise((resolve, reject) => {
      db
        .insert({
          content: record
        })
        .into(tableName)
        .returning('*')
        .then(rows => {
          resolve(rows[0]);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static update(params) {
    const { id, content } = params;
    return new Promise((resolve, reject) => {
      db
        .from(tableName)
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

module.exports = PostModel;
