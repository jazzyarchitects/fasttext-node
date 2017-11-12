# Fast Text - Node Module

A node wrapper around FastText library.  
[![Latest Stable Version](https://img.shields.io/npm/v/fasttext-node.svg)](https://www.npmjs.com/package/fasttext-node)
[![License](https://img.shields.io/npm/l/fasttext-node.svg)](https://www.npmjs.com/package/fasttext-node)
[![NPM Downloads](https://img.shields.io/npm/dt/fasttext-node.svg)](https://www.npmjs.com/package/fasttext-node)
[![NPM Downloads](https://img.shields.io/npm/dm/fasttext-node.svg)](https://www.npmjs.com/package/fasttext-node)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/fasttext-node/Lobby)

[![NPM](https://nodei.co/npm/fasttext-node.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/fasttext-node/)
<hr />

## About Fast Text
fastText is a library for efficient learning of word representations and sentence classification.

### Requirements

**fastText** builds on modern Mac OS and Linux distributions.
Since it uses C++11 features, it requires a compiler with good C++11 support.
These include :

* (gcc-4.6.3 or newer) or (clang-3.3 or newer)

Compilation is carried out using a Makefile, so you will need to have a working **make**.
For the word-similarity evaluation script you will need:

* python 2.6 or newer
* numpy & scipy

<hr />

This node module requires **git** and **curl** to be installed on your system. Installation will fail without these.

## Documentation

You can find the complete documentation of this module at <a href="https://jazzyarchitects.github.io/fasttext-node/FastText.html">https://jazzyarchitects.github.io/FastText/docs/FastText.html</a>

## Example

To use this module in your code, you can import this directly:

```js
  const FastText = require('fasttext-node');
  
  const fastText = new FastText( /* {} library configurations */);
```

### Training

The module exposes a ___train___ method which can be used to train a new model. The training methodology is **supervised** learning.

```js
  const trainFileUri = 'https://raw.githubusercontent.com/jazzyarchitects/fasttext-node/master/train.txt'
  const trainResult = await fastext.train(trainFileUri, 
    { /* options */ 
    epoch: 50,
    lr: 0.01
  });
```
The first argument is the location of training file. It can be a url or file path on local machine.

The train function is an asynchronous function which will return **true** after the training is finished.  
The options arguments is a JSON object with the following properties:

<table>
  <tr>
    <th>Parameter</th>
    <th>Type</th>
    <th>Default Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>epoch</td>
    <td>number</td>
    <td>25</td>
    <td>Number of epochs</td>
  </tr>
  <tr>
    <td>lr</td>
    <td>number</td>
    <td>0.1</td>
    <td>Learning rate</td>
  </tr>
  <tr>
    <td>lrUpdateRate</td>
    <td>number</td>
    <td>100</td>
    <td>Change the rate of updates for the learning rate</td>
  </tr>
  <tr>
    <td>dim</td>
    <td>number</td>
    <td>100</td>
    <td>Size of word vectors</td>
  </tr>
  <tr>
    <td>ws</td>
    <td>number</td>
    <td>5</td>
    <td>Size of the context window</td>
  </tr>
  <tr>
    <td>neg</td>
    <td>number</td>
    <td>5</td>
    <td>Number of negatives sampled</td>
  </tr>
  <tr>
    <td>wordNgrams</td>
    <td>number</td>
    <td>2</td>
    <td>Max length of word ngram</td>
  </tr>
  <tr>
    <td>loss</td>
    <td>enum</td>
    <td>'ns'</td>
    <td>Loss function. Should be one of 'ns' 'hs' or 'softmax'</td>
  </tr>
  <tr>
    <td>thread</td>
    <td>number</td>
    <td>12</td>
    <td>Number of threads</td>
  </tr>
  <tr>
    <td>model</td>
    <td>string</td>
    <td>training-model</td>
    <td>The path to save the model</td>
  </tr>
</table>

### Prediction

After the training has finished, the model can be used to predict the labels of new strings.  

```js

  const options = {
    labelCount: 3
  }

  const result = await fastext.predict([
    'Custard Pudding tasting like raw eggs',
    'Is Himalayan pink salt the same as the pink salt used for curing?',
  ], options);

  // OR 

  const result = await fastext.predict(`
    Custard Pudding tasting like raw eggs
    Is Himalayan pink salt the same as the pink salt used for curing?`,
    options
  );
```
The predict function will return an array of predictions for each input. Each input should be on a different line in the string or in the form of an array.

The second argument to the predict function is a JSON object with the following options
<table>
  <tr>
    <th>Parameter</th>
    <th>Type</th>
    <th>Default Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>labelCount</td>
    <td>number</td>
    <td>3</td>
    <td>Number of labels to return per input string</td>
  </tr>
  <tr>
    <td>model</td>
    <td>string</td>
    <td>training-model</td>
    <td>The file path of model to use for predicting the labels. Do NOT put any extension of model file (.bin or .vec)</td>
  </tr>
</table>


Example output:

```json
  [ 
    { 
      "input": "Custard Pudding tasting like raw eggs",
      "predictions":{ 
        "eggs": 0.607422,
        "egg-whites": 0.00390627,
        "frying": 0.00390627 
      } 
    },
    { 
      "input": "Is Himalayan pink salt the same as the pink salt used for curing?",
      "predictions": { 
        "salt": 0.166016,
        "flavor": 0.0136719, 
        "language": 0.0117188 
      } 
    } 
  ]
```

## Training

The file you use for training should be of the format:

```txt
  __label__food-safety __label__beans How long can I soak dried beans before they are considered inedible?
```

Each label should be prepended by '\_\_label\_\_' (double underscores), followed by the string whose label are specified in the line starting.  
Each string can have multiple labels attached to it.

## License

```
MIT License

Copyright (c) 2017 Call-Em-All

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
