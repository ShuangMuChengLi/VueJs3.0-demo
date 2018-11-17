基础框架使用Node.js作为服务器，使用npm包http-proxy-middleware作反向代理，在app.js中配置。

当前使用webpack，集成了less、ES6的balel

将集成：压缩模块BabelMinifyWebpackPlugin

待定集成：Vue.js或者React.js。
# 启动
## 开发环境
```bash
npm install
npm start
```
## 开发环境(watch模式，node.js与webpack编译分开执行)
```bash
npm install
npm run watch:start  #启动node.js
npm run watch        #webpack编译
```
## 生产环境
```bash
npm install
npm build
```
将生成的dist上传服务器即可

# 更新日志
## 20181113（林超群）
环境变量NODE_ENV在package.json里配置。config/env.js指向process.env.NODE_ENV

新增less编译与压缩
## 20181117（林超群）
1、添加了全局变量插件ProvidePlugin

2、runtime代码分离打包，runtimeChunk: 'single',

3、HashedModuleIdsPlugin插件

4、添加imports-loader，设置Granular Shimming,如为某个js设置this变量指向window

5、exports-loader  ,设置全局exports

6、添加了es6编译器babel
