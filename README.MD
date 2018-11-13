
##开发环境
```bash
npm install
npm start
```
##开发环境(watch)
```bash
npm install
npm run watch:start
npm run watch
```
##生产环境
```bash
npm install
npm build
```
将生成的dist上传服务器即可

#更新日志
##20181113
环境变量NODE_ENV在package.json里配置。config/env.js指向process.env.NODE_ENV
