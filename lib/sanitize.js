module.exports = function(string) {
  const accountNumberRegex = new RegExp(/\d*[X]+\d+/i, 'ig');
  const digitRegex = new RegExp(/\d+/, 'gi');
  const monthRegex = new RegExp(
    '(JAN|FEB|MAR|APR|MAY|JUN|JULY|JUL|AUG|SEPT|SEP|OCT|NOV|DEC)',
    'g'
  );
  const currencyRegex = new RegExp('(Rs|Rs.|INR)', 'gi');
  // eslint-disable-next-line no-useless-escape
  const symbolRegex = new RegExp(/[\:\^\!\@\#\$\&\(\)\-\`\+\,\/\"]/, 'g');
  const multipleDotsRegex = new RegExp(/\.{2,}/, 'gi');
  // const capsRegex = new RegExp(/[A-Z]{3,}/, 'g');
  const spaceRegex = new RegExp(/\s+/, 'gi');

  string = string
    .replace(accountNumberRegex, '')
    .replace(digitRegex, '')
    .replace(monthRegex, '')
    .replace(currencyRegex, '')
    .replace(symbolRegex, '')
    // .replace(capsRegex, '')
    .replace(multipleDotsRegex, '')
    .replace(spaceRegex, ' ');

  string = string.toLowerCase();

  const infoIndex = string.indexOf('info:');
  if (infoIndex <= 0) {
    return string;
  }
  string = string.substr(0, infoIndex);

  return string;
};
