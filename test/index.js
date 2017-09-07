const FastText = require('../index');
const FastTextTools = require('../tools');
const colors = require('colors');

async function trainTest() {
  // eslint-disable-next-line
  const fastext = new FastText({ logs: true });
  try {
    await fastext.train(
      'https://raw.githubusercontent.com/jazzyarchitects/fasttext-node/master/train.txt',
      {
        epoch: 50,
        model: 'my-training-model'
      }
    );
  } catch (err) {
    console.log(colors.red('Training data err', err));
  }
  return true;
}

async function testData() {
  // eslint-disable-next-line
  const fastext = new FastText({ logs: true });
  try {
    const result = await fastext.predict(
      [
        'Custard Pudding tasting like raw eggs',
        'Is Himalayan pink salt the same as the pink salt used for curing?'
      ],
      {
        model: 'my-training-model'
      }
    );

    console.log(colors.green('-------Prediction result---------'));
    console.log(result);
    console.log(colors.green('-------Prediction result---------'));
  } catch (err) {
    console.log(colors.red('Predict err', err));
  }
  return true;
}

async function testAcurracy() {
  const fastext = new FastText({ logs: true });
  let result;
  try {
    result = await fastext.test(
      'https://raw.githubusercontent.com/jazzyarchitects/fasttext-node/master/train.txt',
      {
        labelCount: 5,
        model: 'my-training-model'
      }
    );
  } catch (err) {
    console.log(colors.red('Testing data err', err));
  }
  console.log('Accuracy', result);
  return result;
}

async function generateLabeledData() {
  const data = [
    {
      text: 'Custard Pudding tasting like raw eggs',
      labels: ['egg', 'custard', 'pudding']
    },
    {
      text: 'Is Himalayan pink salt the same as the pink salt used for curing?',
      labels: ['salt', 'curing', 'pink', 'usage']
    }
  ];
  const labelledData = FastTextTools.generateLabelString(data);
  console.log(colors.yellow.bold('Labelled Data'));
  console.log(colors.yellow(labelledData));

  return Promise.resolve(labelledData);
}

async function skipgramTest() {
  console.log(colors.yellow('Starting skipgram test'));
  const fastext = new FastText({ logs: true });

  const result = await fastext.skipgram(
    'https://raw.githubusercontent.com/jazzyarchitects/fasttext-node/master/skipgram.train.txt',
    {
      dim: 5,
      model: 'my-training-model'
    }
  );

  console.log('SKipgram result', result);
  return result;
}

async function cbowTest() {
  console.log(colors.yellow('Starting skipgram test'));
  const fastext = new FastText({ logs: true });

  const result = await fastext.cbow(
    'https://raw.githubusercontent.com/jazzyarchitects/fasttext-node/master/skipgram.train.txt',
    {
      dim: 5,
      model: 'my-training-model'
    }
  );

  console.log('cbow result', result);
  return result;
}

async function sanitizeString() {
  const data =
    'Thank you for your request for Rs123 recharge, benefit will be credited to your account';
  const sanitizedString = FastTextTools.sanitizeString(data);
  console.log('Sanitized string', sanitizedString);
  return Promise.resolve(sanitizedString);
}

Promise.resolve()
  // .then(generateLabeledData)
  // .then(trainTest)
  // .then(testData)
  // .then(testAcurracy)
  // .then(skipgramTest)
  // .then(cbowTest)
  .then(sanitizeString)
  .then(() => {
    console.log(colors.bold.green('Finished test'));
    process.exit(0);
  });
