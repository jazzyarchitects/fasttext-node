import labelGenerator from './generate-labelled-data';
import sanitize from './sanitize';

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
   * @example <caption>Generate labelled string</caption>
   * const FastTextTools = require('fasttext-node/tools');
   * const data = [
   *  {
   *    text: 'Custard Pudding tasting like raw eggs',
   *    labels: ['egg', 'custard', 'pudding'],
   *  },
   *  {
   *    text: 'Is Himalayan pink salt the same as the pink salt used for curing?',
   *    labels: ['salt', 'curing', 'pink', 'usage'],
   *  },
   * ];
   * const labelledData = FastTextTools.generateLabelString(data);
   * @example <caption>The following generated output can be then written to a file and the file can be used to train or test the model</caption>
   * __label__egg __label__custard __label__pudding Custard Pudding tasting like raw eggs
   * __label__salt __label__curing __label__pink __label__usage Is Himalayan pink salt the same as the pink salt used for curing?
   * @memberof FastTextTools
   */
  static generateLabelString(...args) {
    return labelGenerator(...args);
  }

  /**
   * Sanitizes a string for training. This effectively removes all dates, special characters, digits, timestamps etc.
   * It also converts the string to lower case.
   *
   * @static
   * @function sanitizeString
   * @param {string} input - String to be sanitized
   * @returns {string} Sanitized string
   * @example <caption>Sanitize string</caption>
   * const FastTextTools = require('fasttext-node/tools');
   * const data = "Thank you for your request for Rs123 recharge, benefit will be credited to your account";
   * const sanitizedString = FastTextTools.sanitizeString(data);
   * @example <caption>The following sanitized string can be then written to a file and the file can be used to train or test the model</caption>
   * thank you for your request for  recharge benefit will be credited to your account
   * @memberof FastTextTools
   */
  static sanitizeString(...args) {
    return sanitize(...args);
  }
}
