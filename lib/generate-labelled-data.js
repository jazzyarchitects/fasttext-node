/**
 * @typedef {Object} InputObject
 * 
 * @property {string} text The input text whose labels are given
 * @property {Array.<string>} labels Array of labels for the given text 
 * @memberof FastTextTools
 */

/**
 * @typedef {Array.<InputObject>} InputData
 * @memberof FastTextTools
 */

/**
 * Converts a json array to a fastText readable labelled data
 * 
 * @global
 * @function generateLabelString
 * @param {InputData} data - Data object containing labels and training data
 * @param {object} config - Module config
 */
export default function labelGenerator(data, config) {
  let finalData = ``;

  /**
   * [
   *    {
   *        text: 'Input String',
   *        labels: [ 'label1', 'label2' ]
   *    }
   * ]
   */

  for (let dataObject of data) {
    let labels = '';
    for (let label of dataObject.labels) {
      labels += `__label__${label} `;
    }
    finalData += `${labels}${dataObject.text}\n`;
  }

  return finalData;
}
