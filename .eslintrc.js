module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node':true
    },
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'parser': 'babel-eslint',
        'ecmaVersion': 2018,
        'sourceType': 'module',
    },
    'rules': {
        'no-console': process.env.NODE_ENV !== 'production' ? 0 : 2,
        'indent': [
            'error',
            2
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ]
    }
};
