import trainModel from './train';
import predictProb from './predict';
import test from './test';
import unsupervised from './skipgram';

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
      logs: false
    };
    this.__config = Object.assign(this.__config, options);
  }

  /**
   * <hr />
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
   * @param {number} [options.epoch=25] Epoch for the training
   * @param {number} [options.lr=0.01] Learning rate for training model
   * @param {number} [options.lrUpdateRate=100] The rate at which learning rate is to be updated while training
   * @param {number} [options.wordNgrams=2] Max length of word ngram
   * @param {'ns'|'hs'|'softmax'} [options.loss='ns'] Loss function. Should be one of 'ns' 'hs' or 'softmax'
   * @param {number} [options.thread=12] Number of threads
   * @param {string} [options.model='training-model'] The model name which will be used to export the saved model. This option will override the model options passed in the constructor.
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
   * <hr />
   * Predicts the probability label according to a given model
   *
   * @memberof FastText
   * @borrows predictProb as predict
   * @param {string} string - String to predict the labels of
   * @param {object} [options={}] Options for training model
   * @param {number} [options.labelCount=3] Number of labels to be returned by the predicting function
   * @param {string} [options.model='training-model'] The model name which will be used to export the saved model. This option will override the model options passed in the constructor.
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

  /**
    * <hr />
    * Function to test the trained model against a set of test data.
    * <ul>
    * <li>If the testData param is a url the fetch the file from the url</li>
    * <li>If the testData param is a file name then read that filename</li>
    * <li>Else show an error as you cannot test from small amount of data</li>
    *
    * @memberof FastText
    * @param {string} testData URL or filename
    * @param {string} [options={}] Options for training model
    * @param {number} [options.labelCount=3] Number of labels to be returned by the predicting function
    * @param {string} [options.model='training-model'] The model name which will be used to export the saved model
    * @returns {object} Returns the accuracy of the model according to the given test data set. To know what precision and recall mean, visit <a href="https://en.wikipedia.org/wiki/Precision_and_recall">https://en.wikipedia.org/wiki/Precision_and_recall</a>
    * @example <caption>Using fastText.test() to test the accuracy models</caption>
    *  const FastText = require('fasttext-node');
    *  const fastText = new FastText();  // Pass any configurations in the constructor
    *  const result = await fastText.test(
    *    'https://raw.githubusercontent.com/jazzyarchitects/fasttext-node/master/train.txt',
    *    {
    *      labelCount: 3,
    *      model: 'my-training-model',
    *    }
    *  );
    * @example <caption>Result of fastText.test()</caption>
    * {
    *    samples: 12404,
    *    precision: 0.203,
    *    recall: 0.44
    * }
    * @instance
    */
  test(testData, options) {
    return test(testData, options, this.__config);
  }

  /**
   * <hr ?>
   * Function to train a skipgram model
   * <br /><br />
   * Difference between CBOW and SKIPGRAM model can be found at:
   * <a href="https://github.com/facebookresearch/fastText/blob/master/tutorials/unsupervised-learning.md#advanced-readers-skipgram-versus-cbow">Skipgram v/s Cbow</a>
   *
   * <img src="https://github.com/facebookresearch/fastText/raw/master/tutorials/cbo_vs_skipgram.png" width="500px" />
   *
   * @memberof FastText
   * @param {string} trainData URL or filename
   * @param {string} [options={}] Options for training model
   * @param {number} [options.dim=100] Size of word vector
   * @param {number} [options.ws=5] Size of context window
   * @param {number} [options.neg=5] Number of negatives sampled
   * @param {number} [options.maxn=5] Maximum wordGram length
   * @param {number} [options.minn=3] Minimum wordGram length
   * @param {string} [options.model='training-model-unsupervised'] The model name which will be used to export the saved model
   * @returns {boolean} Returns true after finishing the training
   * @example <caption>Using fastText.skipgram() to train models</caption>
   *  const FastText = require('fasttext-node');
   *  const fastText = new FastText();  // Pass any configurations in the constructor
   *  const result = await fastText.skipgram(
   *    'https://raw.githubusercontent.com/jazzyarchitects/fasttext-node/master/train.txt',
   *    {
   *      dim: 50,
   *      model: 'my-training-model-skipgram',
   *    }
   *  );
   * @instance
  */
  skipgram(trainData, options) {
    return unsupervised(trainData, options, this.__config);
  }

  /**
   * <hr ?>
   * Function to train a CBOW model
   *
   * @memberof FastText
   * @param {string} trainData URL or filename
   * @param {string} [options={}] Options for training model
   * @param {number} [options.dim=100] Size of word vector
   * @param {number} [options.ws=5] Size of context window
   * @param {number} [options.neg=5] Number of negatives sampled
   * @param {number} [options.maxn=5] Maximum wordGram length
   * @param {number} [options.minn=3] Minimum wordGram length
   * @param {string} [options.model='training-model-skipgram'] The model name which will be used to export the saved model
   * @returns {boolean} Returns true after finishing the training
   * @example <caption>Using fastText.skipgram() to train models</caption>
   *  const FastText = require('fasttext-node');
   *  const fastText = new FastText();  // Pass any configurations in the constructor
   *  const result = await fastText.cbow(
   *    'https://raw.githubusercontent.com/jazzyarchitects/fasttext-node/master/train.txt',
   *    {
   *      dim: 50,
   *      model: 'my-training-model-cbow',
   *    }
   *  );
   * @instance
  */
  cbow(trainData, options) {
    options.cbow = true;
    return unsupervised(trainData, options, this.__config);
  }
  // cbow
  // skipgram
  // nn
  // analogies
}
