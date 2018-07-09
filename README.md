# Fast Text - Node Module

A node wrapper around FastText library.  
[![Latest Stable Version](https://img.shields.io/npm/v/fasttext-node.svg)](https://www.npmjs.com/package/fasttext-node)
[![License](https://img.shields.io/npm/l/fasttext-node.svg)](https://www.npmjs.com/package/fasttext-node)
[![NPM Downloads](https://img.shields.io/npm/dt/fasttext-node.svg)](https://www.npmjs.com/package/fasttext-node)
[![NPM Downloads](https://img.shields.io/npm/dm/fasttext-node.svg)](https://www.npmjs.com/package/fasttext-node)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/fasttext-node/Lobby)

[![NPM](https://nodei.co/npm/fasttext-node.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/fasttext-node/)
<hr />

## Platform Support
[![Linux Supported](https://img.shields.io/badge/Linux-Supported-brightgreen.svg)](https://github.com/jazzyarchitects/fasttext-node)  
[![MacOS Supported](https://img.shields.io/badge/MacOS-Supported-brightgreen.svg)](https://github.com/jazzyarchitects/fasttext-node)  
[![Windows Not Supported](https://img.shields.io/badge/Windows-Not%20Supported-red.svg)](https://github.com/jazzyarchitects/fasttext-node)  


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
