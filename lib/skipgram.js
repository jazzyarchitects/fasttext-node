import fasttext from './fasttext-exec';
import colors from 'colors';
import exec from './exec';
import isURL from 'is-url';
import path from 'path';
import fs from 'fs';

const defaultOptions = {
  dim: 100,
  ws: 3,
  neg: 5,
  maxn: 5,
  minn: 2,
  model: 'training-model-unsupervised'
};

/**
 * Function to train a skipgram model
 *
 * @export
 * @param {string} trainData URL or filename
 * @param {string} [options={}] Options for training model
 * @property {number} [options.dim=100] Size of word vector
 * @property {number} [options.ws=5] Size of context window
 * @property {number} [options.neg=5] Number of negatives sampled
 * @property {number} [options.maxn=5] Maximum wordGram length
 * @property {number} [options.minn=3] Minimum wordGram length
 * @property {string} [options.model='training-model-unsupervised'] The model name which will be used to export the saved model
 * @returns {object} Returns the accuracy of the model according to the given test data set
 */
export default async function trainSkipGram(
  trainData,
  options = {},
  fastTextConfig = {}
) {
  let executeFunction = 'skipgram';

  if (options.cbow === true) {
    executeFunction = 'cbow';
  }

  let filename = trainData;

  // Check if a url is passed
  if (isURL(trainData)) {
    // Download the data from the url
    fastTextConfig.logs &&
      console.log(
        colors.yellow(`Downloading ${executeFunction} training file...`)
      );
    const output = await exec(`curl ${trainData} -o test.txt`);
    fastTextConfig.logs && console.log(output);
    filename = path.join(__dirname, '..', '..', 'test.txt');
  }

  if (!fs.existsSync(filename)) {
    fastTextConfig.logs &&
      console.log(
        colors.red(
          `Test data should be a path/url to some txt file. Check the arguments for FastText.${executeFunction}() function`
        )
      );
    return false;
  }
  fastTextConfig.logs &&
    console.log(colors.yellow(`Training ${executeFunction} fasttext model`));

  const defaultOptionKeys = Object.keys(defaultOptions);
  const finalOptions = Object.assign(defaultOptions, options);
  finalOptions.model =
    options.model || fastTextConfig.model || defaultOptions.model;
  if (finalOptions.model.indexOf(path.sep) === -1) {
    // if only name is provided, then store in parent folder
    finalOptions.model = path.join(__dirname, '..', '..', finalOptions.model);
  }

  let arg = '';

  const optionKeys = Object.keys(finalOptions);

  // Prevent unsupported keys from executing with the command
  for (let key of optionKeys) {
    if (defaultOptionKeys.indexOf(key) === -1) {
      continue;
    }
    if (key === 'model') {
      continue;
    }
    arg += ` -${key} ${finalOptions[key]}`;
  }

  // eslint-disable-next-line
  const trainingCommand = `${executeFunction} -input ${filename} -output ${finalOptions[
    'model'
  ]}${arg}`;

  const { stderr, stdout } = await fasttext(trainingCommand);

  const value = `${stdout}\n${stderr}`;

  fastTextConfig.logs &&
    console.log(colors.green(`${executeFunction} training model: ${value}`));

  return value;
}
