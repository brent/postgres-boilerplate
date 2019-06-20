"use strict";

const handleResponse = function(res, data) {
  res.status(200).json({
    'status': 200,
    'data': data || { },
  });
};

module.exports = {
  handleResponse,
};
