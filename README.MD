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
