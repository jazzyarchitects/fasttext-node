module.exports = {
  parser: 'babel-eslint',
  extends: ['standard'],
  plugins: ['standard', 'promise'],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    semi: 0,
    quotes: 0,
    'comma-dangle': 0,
    'space-before-function-paren': 0,
  },
};
