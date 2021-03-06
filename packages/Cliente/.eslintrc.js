module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    Atomics:
      'readonly',
    SharedArrayBuffer:
      'readonly',
  },
  parser:
    '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType:
      'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'react-hooks',
  ],

  rules: {
    'react/jsx-one-expresion-per-line':
      'off',
    'react/jsx-props-no-spreading':
      'off',
    'react-hooks/exhaustive-deps':
      'warn',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: [
          '.tsx',
        ],
      },
    ],
    'import/prefer-default-export':
      'off',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts:
          'never',
        tsx:
          'never',
      },
    ],
    'import/no-extraneous-dependencies':
      'off',
    'react-hooks/rules-of-hooks':
      'error',
    'react-hooks/exhaustive-deps':
      'warn',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off'
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
