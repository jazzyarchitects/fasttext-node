import fasttext from './fasttext-exec';
import colors from 'colors';
import exec from './exec';
import isURL from 'is-url';
import path from 'path';
import fs from 'fs';
import 'babel-polyfill';

const defaultOptions = {
  epoch: 25,
  lr: 0.01,
  lrUpdateRate: 100,
  wordNgrams: 2,
  loss: 'ns',
  thread: 12,
  model: path.join(__dirname, '..', '..', 'training-model')
};

/**
 * Function to train a model from the given training data.
 * If the trainData param is a url the fetch the file from the url.
 * If the trainData param is a file name then read that filename
 * Else show an error as you cannot train from small amount of data
 *
 * @export
 * @param {string} trainData URL or filename
 * @param {string} [options={epoch: 25,lr: 0.1,lrUpdateRate: 100,dim: 100,ws: 5,neg: 5,wordNgrams: 2,loss: 'ns',}] Options for training model
 * @property {number} [options.epoch=25] Epoch for the training
 * @property {number} [options.lr=0.1] Learning rate for training model
 * @property {number} [options.lrUpdateRate=100] The rate at which learning rate is to be updated while training
 * @property {number} [options.wordNgrams=2] Max length of word ngram
 * @property {'ns'|'hs'|'softmax'} [options.loss='ns'] Loss function. Should be one of 'ns' 'hs' or 'softmax'
 * @property {number} [options.thread=12] Number of threads
 * @property {string} [options.model='training-model'] The model name which will be used to export the saved model
 * @returns {boolean} Returns true after finishing the training
 */
export default async function train(
  trainData,
  options = {},
  fastTextConfig = {}
) {
  let filename = trainData;

  // Check if a url is passed
  if (isURL(trainData)) {
    // Download the data from the url
    fastTextConfig.logs &&
      console.log(colors.yellow('Downloading training file...'));
    const output = await exec(`curl ${trainData} -o train.txt`);
    fastTextConfig.logs && console.log(output);
    filename = path.join(__dirname, '..', '..', 'train.txt');
  }

  if (!fs.existsSync(filename)) {
    fastTextConfig.logs &&
      console.log(
        colors.red(
          'Training data should be a path/url to some txt file. Check the arguments for FastText.train() function'
        )
      );
    return false;
  }
  fastTextConfig.logs && console.log(colors.yellow('Training fasttext model'));

  const defaultOptionKeys = Object.keys(defaultOptions);
  let arg = ``;
  const finalOptions = Object.assign(defaultOptions, options);
  finalOptions.model =
    options.model || fastTextConfig.model || defaultOptions.model;
  if (finalOptions.model.indexOf(path.sep) === -1) {
    // if only name is provided, then store in parent folder
    finalOptions.model = path.join(__dirname, '..', '..', finalOptions.model);
  }
  const optionKeys = Object.keys(finalOptions);

  // Prevent unsupported keys from executing with the command
  for (let key of optionKeys) {
    if (!defaultOptionKeys.includes(key)) {
      continue;
    }
    if (key === 'model') {
      continue;
    }
    arg += ` -${key} ${finalOptions[key]}`;
  }

  const trainingCommand = `supervised -input ${filename} -output ${finalOptions.model}${arg}`;

  const trainingModel = await fasttext(trainingCommand);
  fastTextConfig.logs &&
    console.log(colors.green(`Training model: ${trainingModel.stderr}`));

  return true;
}
