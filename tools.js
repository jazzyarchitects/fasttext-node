const FastText = require('./dist/lib/tools');

function FastTextTools(config) {
  this.__config = config;
}

FastTextTools.generateLabelString = FastText.default.generateLabelString;
FastTextTools.sanitizeString = FastText.default.sanitizeString;

module.exports = FastTextTools;
