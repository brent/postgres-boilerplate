"use strict";

const db = require('../db');
const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const TABLE_NAME = 'tokens';

class Token {
  static saveTokenForUser(userId) {
    const token = Token.generateRefreshToken();

    return new Promise((resolve, reject) => {
      db
        .returning('token')
        .insert({
          userId: userId,
          token: token,
        })
        .into(TABLE_NAME)
        .then(rows => resolve(rows[0]))
        .catch(err => reject(err))
    });
  }

  static findTokenForUser(userId) {
    return new Promise((resolve, reject) => {
        db
          .first()
          .from(TABLE_NAME)
          .where('userId', '=', userId)
          .then(rows => resolve(rows['token']))
          .catch(err => reject(err));
    });
  }

  static generateAccessToken(user) {
    const params = {
      userId: user.id,
      username: user.username,
    };

    const token = jwt.sign(params, JWT_SECRET, { expiresIn: 300 });

    return token;
  }

  static generateRefreshToken() {
    return uuidv4();
  }
}

module.exports = Token;
