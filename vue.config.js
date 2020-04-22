// vue.config.js
const entryConfig = require('./config/entry-config');
const config = require('./config/config');
const path = require('path');
let buildPath;
if (config.buildTarget === 'demo') {
  buildPath = path.resolve(__dirname, './demo/dist');
} else {
  buildPath = path.resolve(__dirname, './dist');
}
module.exports = {
  publicPath: '',
  pages: {
    index: {
      // page 的入口
      entry: entryConfig

    }
  },
  outputDir: buildPath,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:10999',
        changeOrigin: true
      },
      '/demo': {
        target: 'http://localhost:10999',
        changeOrigin: true,
        pathRewrite: {
          '/demo': ''
        }
      }
    }
  }
};
