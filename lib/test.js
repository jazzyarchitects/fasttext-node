import fasttext from './fasttext-exec';
import colors from 'colors';
import exec from './exec';
import isURL from 'is-url';
import path from 'path';
import fs from 'fs';

const defaultOptions = {
  labelCount: 3,
  model: 'training-model',
};

/**
 * Function to test the trained model against a set of test data.
 * If the testData param is a url the fetch the file from the url.
 * If the testData param is a file name then read that filename
 * Else show an error as you cannot test from small amount of data
 *
 * @export
 * @param {string} testData URL or filename
 * @param {string} [options={}] Options for training model
 * @property {number} [options.labelCount=3] Number of labels to be returned by the predicting function
 * @property {string} [options.model='training-model'] The model name which will be used to export the saved model
 * @returns {object} Returns the accuracy of the model according to the given test data set
 */
export default async function testTrainedModel(
  testData,
  options = {},
  fastTextConfig = {}
) {
  let filename = testData;

  // Check if a url is passed
  if (isURL(testData)) {
    // Download the data from the url
    fastTextConfig.logs &&
      console.log(colors.yellow('Downloading testing file...'));
    const output = await exec(`curl ${testData} -o test.txt`);
    fastTextConfig.logs && console.log(output);
    filename = path.join(__dirname, '..', '..', 'test.txt');
  }

  if (!fs.existsSync(filename)) {
    fastTextConfig.logs &&
      console.log(
        colors.red(
          'Test data should be a path/url to some txt file. Check the arguments for FastText.test() function'
        )
      );
    return false;
  }
  fastTextConfig.logs && console.log(colors.yellow('Training fasttext model'));

  const finalOptions = Object.assign(defaultOptions, options);
  finalOptions.model =
    options.model || fastTextConfig.model || defaultOptions.model;
  if (finalOptions.model.indexOf(path.sep) === -1) {
    // if only name is provided, then store in parent folder
    finalOptions.model = path.join(__dirname, '..', '..', finalOptions.model);
  }

  const trainingCommand = `test ${finalOptions.model}.bin ${filename} ${finalOptions.labelCount}`;

  const { stderr, stdout } = await fasttext(trainingCommand);
  const value = `${stdout}\n${stderr}`;

  const splits = value.split('\n');
  const samples = Number(splits[0].split('\t').pop());
  const precision = Number(splits[1].split('\t').pop());
  const recall = Number(splits[2].split('\t').pop());
  fastTextConfig.logs && console.log(colors.green(`Testing model: ${value}`));

  return { samples, precision, recall };
}
