import { exec } from 'child_process';
import colors from 'colors';

export default function(command) {
  return new Promise(resolve => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        // console.log('Error executing command', err);
      }
      resolve(colors.magenta(stdout || stderr));
    });
  });
}
