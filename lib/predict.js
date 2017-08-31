import fasttext from './fasttext-exec';

const defaultOptions = {
  labelCount: 3,
};

/**
 * Predicts the probability label according to a given model
 * 
 * @export
 * @param {string} string - String to predict the labels of 
 * @param {object} [options={}] - Aditional Options
 * @param {string} [modelName='training-model'] - Optional model name
 * @returns 
 */
export default async function predictFastText(
  string,
  options = {},
  modelName = 'training-model'
) {
  if (Array.isArray(string)) {
    string = string.join('\n');
  }

  const finalOptions = Object.assign(defaultOptions, options);
  const command = `predict-prob ${modelName}.bin - ${finalOptions.labelCount}`;
  const testOutput = await fasttext(command, string);

  const results = testOutput.split('\n').filter(c => !!c);
  const finalData = [];
  const inputs = string.split('\n');

  for (let j = 0; j < results.length; j += 1) {
    let result = results[j];
    let testData = inputs[j];
    result = result.split(' ');
    const data = {};
    for (let i = 0; i < result.length; i += 2) {
      let label = result[i];
      label = label.replace(/__label__/, '').replace('\n', '');
      const prob = Number(result[i + 1].replace('\n', ''));
      data[label] = prob;
    }
    finalData.push({
      input: testData.trim(),
      predictions: data,
    });
  }

  return finalData;
}
