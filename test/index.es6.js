const FastText = require('./index');
const colors = require('colors');

async function trainTest() {
  const fastText = new FastText();
  try {
    await fastText.train(
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

trainTest().then(() => {
  console.log('Finished');
  process.exit(0);
});
