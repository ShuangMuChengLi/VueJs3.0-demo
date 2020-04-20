// vue.config.js
const entryConfig = require('./src/config/entry-config');
module.exports = {
  publicPath: '',
  pages: {
    index: {
      // page 的入口
      entry: entryConfig,

    },
  }
};
