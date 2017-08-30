const FastText = require('../index');
const colors = require('colors');

async function trainTest() {
  // eslint-disable-next-line
  const fastext = new FastText.default();
  try {
    await fastext.train(
      'https://raw.githubusercontent.com/jazzyarchitects/fasttext-node/master/train.txt',
      {
        epoch: 50,
      }
    );
  } catch (err) {
    console.log(colors.red('Training data err', err));
  }
  return true;
}

async function testData() {
  // eslint-disable-next-line
  const fastext = new FastText.default();
  try {
    const result = await fastext.predict([
      'Custard Pudding tasting like raw eggs',
      'Is Himalayan pink salt the same as the pink salt used for curing?',
    ]);

    console.log(colors.green('-------Prediction result---------'));
    console.log(result);
    console.log(colors.green('-------Prediction result---------'));
  } catch (err) {
    console.log(colors.red('Predict err', err));
  }
  return true;
}

trainTest().then(testData).then(() => {
  console.log(colors.bold.green('Finished test'));
  process.exit(0);
});
