module.exports = {
  extends: [
    'airbnb',
  ],
  globals: {
    ConfigError: true,
    InvalidConfigurationError: true,
    InvalidParametersError: true,
    NotFoundError: true,
    ServerError: true,
  },
  parser: 'babel-eslint',
  env: {
    node: true,
    mocha: true,
    browser: true,
  },
  plugins: [
    'react',
    'jsx-a11y',
    'import',
  ],
  rules: {
    // http://eslint.org/docs/user-guide/migrating-to-4.0.0#-the-indent-rule-is-more-strict
    indent: ['error', 2, {
      MemberExpression: 0, // Allows inline member expressions
      SwitchCase: 1, // Allows indentation of 'case' after 'switch'
    }],
    'max-len': [2, 160, 2, { ignoreComments: true }],
    'no-underscore-dangle': 'off',
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],
    "jsx-a11y/anchor-is-valid": [ "error", { "specialLink": ["to"] }],
    'curly': [2, 'all'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-unused-expressions': 0,
    'arrow-body-style': 'off',
    'import/extensions': 'off',
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-curly-spacing': 'off',
    'react/no-danger': 'off',
    'react/prefer-stateless-function': 'off',
    'react/sort-comp': 'off',
    'react/no-deprecated': 'warn',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'require-await': 'error',
  },
};
