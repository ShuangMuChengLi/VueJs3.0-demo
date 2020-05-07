module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  plugins: [
    'vue'
  ],
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    eqeqeq: ['error', 'smart'], // 必须全等号代替等号
    'vue/no-v-html': 0,
    'vue/html-indent': [
      'error',
      2
    ],
    indent: [
      'error',
      2
    ],
    quotes: [
      'error',
      'single'
    ]
  }
}
