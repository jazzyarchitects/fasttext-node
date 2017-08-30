import trainModel from './train';
import path from 'path';

const configOptions = {
  modelDirectory: path.join(__dirname, '..', '..'),
};
export default class FastText {
  /**
   * Creates an instance of FastText.
   * @param {any} [options={}] 
   * @memberof FastText
   */
  constructor(options = {}) {
    const config = Object.assign(configOptions, options);

    this.__config = config;
  }

  /**
   * Trains a model
   * 
   * @augments trainModel
   */
  train(...args) {
    return trainModel(...args);
  }
}
