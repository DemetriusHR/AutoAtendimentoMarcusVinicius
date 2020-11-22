module.exports = {
  extends: [
    'plugin:node/recommended',
  ],
  rules: {
    'no-async-promise-executor':
      'off',
    'node/exports-style': [
      'error',
      'module.exports',
    ],
    'node/file-extension-in-import': [
      'error',
      'always',
    ],
    'node/prefer-global/buffer': [
      'error',
      'always',
    ],
    'node/prefer-global/console': [
      'error',
      'always',
    ],
    'node/prefer-global/process': [
      'error',
      'always',
    ],
    'node/prefer-global/url-search-params': [
      'error',
      'always',
    ],
    'node/prefer-global/url': [
      'error',
      'always',
    ],
    'node/prefer-promises/dns':
      'error',
    'node/no-unpublished-require': [
      'error',
      {
        allowModules: [
          'express',
        ],
      },
    ],
  },
};
