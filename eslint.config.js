const globals = require('globals');
const js = require('@eslint/js');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  js.configs.recommended,
  
  prettierConfig,

  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.jest
      }
    },
    rules: {
      'no-console': 'off',
      
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_|req|res|next' }]
    },
    ignores: ['node_modules/']
  }
];