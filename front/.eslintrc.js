module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended'],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-trailing-spaces': 0,
    'space-before-function-paren': 0,
    'no-unused-vars': 1,
    'vue/max-attributes-per-line': 0,
    'curly': 0,
    'comma-dangle': ['error', 'always-multiline'],
    'arrow-parens': ['error', 'as-needed'],
  },
}
