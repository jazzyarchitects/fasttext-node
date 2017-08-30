import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const testFile = path.join(__dirname, '..', '..', '.testfile.txt');

const FAST_TEXT = path.join(__dirname, '..', '..', 'fastText', 'fastText');

/**
 * Executes a fast text function. If predicting then use test data
 * 
 * @export
 * @param {string} args Arguments to fasttext method
 * @param {string} testData Test string 
 * @returns {Promise} A promise which resolves the stdout of the function
 */
export default function execute(args, testData = '') {
  return new Promise((resolve, reject) => {
    let stdoutData = '';
    let stdErrorData = '';
    const fasttext = spawn(`${FAST_TEXT}`, args.split(' '));

    if (args.indexOf('predict') !== -1 || args.indexOf('test ') !== -1) {
      fs.writeFileSync(testFile, testData);
      const r = fs.createReadStream(testFile);
      r.pipe(fasttext.stdin);
    }
    fasttext.stdout.on('data', data => {
      stdoutData += data;
    });
    fasttext.stderr.on('data', err => {
      stdErrorData += err;
    });

    fasttext.stdout.on('end', () => {
      resolve(stdoutData || stdErrorData);
    });

    fasttext.stderr.on('end', () => {
      resolve(stdErrorData || stdoutData);
    });
  });
}
