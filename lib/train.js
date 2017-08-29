import fasttext from './fasttext-exec';
import colors from 'colors';
import exec from './exec';
import isURL from 'is-url';
import path from 'path';
import fs from 'fs';

/**
 * Function to train a model from the given training data.
 * If the trainData param is a url the fetch the file from the url.
 * If the trainData param is a file name then read that filename
 * Else show an error as you cannot train from small amount of data
 * 
 * @export
 * @param {string} trainData URL or filename
 * @param {string} modelName The modelname to be used to store the training data
 * @returns 
 */
export default async function train(trainData, modelName = 'training-model') {
  let filename = trainData;
  if (isURL(trainData)) {
    const output = await exec(`curl ${trainData} -o train.txt`);
    console.log(output);
    filename = path.join(__dirname, '..', '..', 'train.txt');
  }

  if (!fs.existsSync(filename)) {
    console.log(
      colors.red(
        'Training data should be a path/url to some txt file. Check the arguments for FastText.train() function'
      )
    );
    return false;
  }
  console.log(colors.bold.cyan('Training fasttext model'));
  const trainingModel = await fasttext(
    `supervised -input ${filename} -output ${modelName} -epoch 50 -lr 0.2 -wordNgrams 2`
  );
  console.log(colors.green(`Training model: ${trainingModel}`));

  return true;
}
