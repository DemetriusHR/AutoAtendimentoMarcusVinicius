module.exports = {
  parser:
    '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:node/recommended',
  ],
  overrides: [
    {
      files: [
        '*.js',
      ],
      rules: {
        '@typescript-eslint/no-var-requires':
          'off',
      },
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version:
        'detect',
    },
  },
  rules: {
    'react/prop-types':
      'off',
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
