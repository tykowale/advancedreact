// eslint-disable-next-line import/no-extraneous-dependencies
const a11yOff = Object.keys(require('eslint-plugin-jsx-a11y').rules).reduce((acc, rule) => {
  acc[`jsx-a11y/${rule}`] = 'off';
  return acc;
}, {});

module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: ['prettier', 'prettier/react', 'plugin:react/recommended', 'airbnb'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    ...a11yOff,
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    'react/prop-types': [1, { skipUndeclared: true }],
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'arrow-body-style': 0,
    'object-curly-newline': 0,
    'no-console': 0,
    'max-len': ['error', { code: 100 }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
