'use strict';

const path = require('path');
const FastText = require(path.join(__dirname, 'dist', 'lib'));

module.exports = function(...args) {
  // eslint-disable-next-line new-cap
  return new FastText.default(...args);
};
