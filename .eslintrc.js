module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    es6: true,
    browser: true,
    node: true
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx']
      }
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    "plugin:jsx-a11y/recommended",
    'plugin:import/recommended',
    'plugin:import/react',
    'plugin:prettier/recommended'
  ],
  plugins: [
    'react',
    "jsx-a11y",
    'import',
    'prettier'
  ],
  rules: {
    "prettier/prettier": ["error"],
    'no-console': 'off',
    'react/no-typos': 'error',
    'import/order': [
      'error', {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ]
      }
    ]
  }
};