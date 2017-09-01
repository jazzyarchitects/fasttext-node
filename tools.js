const FastText = require('./dist/lib/tools');

function FastTextTools(config) {
  this.__config = config;
}

FastTextTools.generateLabelString = FastText.default.generateLabelString;

module.exports = FastTextTools;
