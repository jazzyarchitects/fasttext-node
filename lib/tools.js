import labelGenerator from './generate-labelled-data';

/**
 * Exports an instance of FastTextTools class
 * 
 * @export
 * @class FastTextTools
 */
export default class Tools {
  /**
   * Generates a single string which can be used to train or test the data from the given JSON array
   * 
   * @static
   * @function generateLabelString
   * @param {InputData} data - Data object containing labels and training data
   * @param {object} config - Module config
   * @returns {string} Converted string
   * @memberof FastTextTools
   */
  static generateLabelString(...args) {
    return labelGenerator(...args);
  }
}
