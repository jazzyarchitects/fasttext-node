const FastText = require('../index');
const FastTextTools = require('../tools');
const colors = require('colors');

async function trainTest() {
  // eslint-disable-next-line
  const fastext = new FastText();
  try {
    await fastext.train(
      'https://raw.githubusercontent.com/jazzyarchitects/fasttext-node/master/train.txt',
      {
        epoch: 50,
        model: 'my-training-model',
      }
    );
  } catch (err) {
    console.log(colors.red('Training data err', err));
  }
  return true;
}

async function testData() {
  // eslint-disable-next-line
  const fastext = new FastText();
  try {
    const result = await fastext.predict(
      [
        'Custard Pudding tasting like raw eggs',
        'Is Himalayan pink salt the same as the pink salt used for curing?',
      ],
      {
        model: 'my-training-model',
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

async function generateLabeledData() {
  console.dir(FastTextTools.toString());
  const data = [
    {
      text: 'Custard Pudding tasting like raw eggs',
      labels: ['egg', 'custard', 'pudding'],
    },
    {
      text: 'Is Himalayan pink salt the same as the pink salt used for curing?',
      labels: ['salt', 'curing', 'pink', 'usage'],
    },
  ];
  const labelledData = FastTextTools.generateLabelString(data);
  console.log(colors.yellow.bold('Labelled Data'));
  console.log(colors.yellow(labelledData));

  return Promise.resolve(labelledData);
}

Promise.resolve()
  .then(generateLabeledData)
  .then(trainTest)
  // Promise.resolve()
  .then(testData)
  .then(() => {
    console.log(colors.bold.green('Finished test'));
    process.exit(0);
  });
