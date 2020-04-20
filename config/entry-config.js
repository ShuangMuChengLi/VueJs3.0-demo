/**
 * 入口文件配置
 * @type {string}
 */
const ENV = process.env.NODE_ENV;
let buildTarget = require('./config').buildTarget;
let appEntry;
if(buildTarget === 'current'){
  appEntry = './src/main/current.js';
}else if(buildTarget === 'demo'){
  appEntry = './demo/index.js';
}else if(ENV === 'production'){
  appEntry = './src/main/production.js';
}else{
  appEntry = './src/main/dev.js';
}
module.exports = appEntry;
