import trainModel from './train';
import predictProb from './predict';

export default class FastText {
  /**
   * Creates an instance of FastText.
   * @param {any} [options={}] 
   * @memberof FastText
   */
  constructor(options = {}) {
    this.__config = {
      logs: false,
    };
    this.__config = Object.assign(this.__config, options);
  }

  /**
   * Trains a model
   * 
   * @augments trainModel
   * @memberof FastText
   */
  train(...args) {
    return trainModel(...args, this.__config);
  }

  /**
   * Predicts the label of string according to the given model
   * 
   * @augments predictProb
   * @memberof FastText
   */
  predict(...args) {
    return predictProb(...args, this.__config);
  }
}
