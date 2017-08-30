import { exec } from 'child_process';
import colors from 'colors';

export default function(command) {
  // console.log('Executing command', command);
  return new Promise(resolve => {
    exec(command, (err, stdout, stderr) => {
      // console.log(err, stdout, stderr);
      if (err) {
        // console.log('Error executing command', err);
      }
      resolve(colors.magenta(stdout || stderr));
    });
  });
}
