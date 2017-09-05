import trainModel from './train';
import predictProb from './predict';

/**
 * Exports an instance of FastText class
 *
 * @export
 * You can define the global configuration of the library instance by passing the option in the constructor
 * @param {object} [options={}] Library configuration
 * @param {string} [options.model='training-model'] The model path which will be used for this instance
 * @param {boolean} [options.logs=false] Whether to show library logs
 * @class FastText
 */
export default class FastText {
  constructor(options = {}) {
    this.__config = {
      logs: false,
    };
    this.__config = Object.assign(this.__config, options);
  }

  /**
   * Function to train a model from the given training data. This function uses supervised learning for training the model.
   * <ul>
   * <li>If the trainData param is a url the fetch the file from the url</li>
   * <li>If the trainData param is a file name then read that filename</li>
   * <li>Else show an error as you cannot train from small amount of data</li>
   * </ul>
   *
   * @memberof FastText
   * @borrows trainModel as train
   * @param {string} trainData URL or filename
   * @param {object} [options={}] Options for training model
   * @property {number} [options.epoch=25] Epoch for the training
   * @property {number} [options.lr=0.1] Learning rate for training model
   * @property {number} [options.lrUpdateRate=100] The rate at which learning rate is to be updated while training
   * @property {number} [options.dim=5] Size of word vector
   * @property {number} [options.ws=5] Size of context window
   * @property {number} [options.neg=5] Number of negatives sampled
   * @property {number} [options.wordNgrams=2] Max length of word ngram
   * @property {'ns'|'hs'|'softmax'} [options.loss='ns'] Loss function. Should be one of 'ns' 'hs' or 'softmax'
   * @property {number} [options.thread=12] Number of threads
   * @property {string} [options.model='training-model'] The model name which will be used to export the saved model. This option will override the model options passed in the constructor.
   * @returns {boolean} Returns true after finishing the training
   * @example <caption>Using fastText.train() to train models</caption>
   *  const FastText = require('fasttext-node');
   *  const fastText = new FastText();  // Pass any configurations in the constructor
   *  const result = await fastText.train(
   *    'https://raw.githubusercontent.com/jazzyarchitects/fasttext-node/master/train.txt',
   *    {
   *      epoch: 50,
   *      model: 'my-training-model',
   *    }
   *  );
   * @instance
   */
  train(trainData, options) {
    return trainModel(trainData, options, this.__config);
  }

  /**
   * Predicts the probability label according to a given model
   *
   * @memberof FastText
   * @borrows predictProb as predict
   * @param {string} string - String to predict the labels of
   * @param {object} [options={}] Options for training model
   * @property {number} [options.labelCount=3] Number of labels to be returned by the predicting function
   * @property {string} [options.model='training-model'] The model name which will be used to export the saved model. This option will override the model options passed in the constructor.
   * @returns {array} An array of input and it's respective label and probability
   * @example <caption>Using fastText.predict() to predict labels of a string from the given model</caption>
   *  const FastText = require('fasttext-node');
   *  const fastText = new FastText();  // Pass any configurations in the constructor
   *  const result = await fastext.predict(
   *   [
   *     'Custard Pudding tasting like raw eggs',
   *     'Is Himalayan pink salt the same as the pink salt used for curing?',
   *   ],
   *   {
   *     model: 'my-training-model',
   *   }
   *  );
   *
   * // OR
   *
   *  const result = await fastext.predict(`
   *     Custard Pudding tasting like raw eggs
   *     Is Himalayan pink salt the same as the pink salt used for curing?
   *   `,
   *   {
   *     model: 'my-training-model',
   *   }
   *  );
   * @example <caption>Result of fastText.predict()</caption>
   * [
   *    {
   *      input: 'Custard Pudding tasting like raw eggs',
   *      predictions: {
   *        eggs: 0.595703,
   *        'egg-whites': 0.00390627,
   *        frying: 0.00390627
   *      }
   *    },
   *    {
   *      input: 'Is Himalayan pink salt the same as the pink salt used for curing?',
   *      predictions: {
   *        salt: 0.166016,
   *        flavor: 0.0136719,
   *        language: 0.0117188
   *    }
   * ]
   * @instance
   */
  predict(string, options) {
    return predictProb(string, options, this.__config);
  }
}
