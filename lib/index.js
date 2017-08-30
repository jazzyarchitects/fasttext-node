import trainModel from './train';
import predictProb from './predict';
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
   * @memberof FastText
   */
  train(...args) {
    return trainModel(...args);
  }

  /**
   * Predicts the label of string according to the given model
   * 
   * @augments predictProb
   * @memberof FastText
   */
  predict(...args) {
    return predictProb(...args);
  }
}
