const axios = require("axios");
const config = require("../config/config");
axios.post(config.api_local + "/captureInfo/getCaptureInfoCount").
    then((data)=>{
        console.log(data);
        document.write("node.js代理本地json，模拟远程api:");
        document.write("<br/>");
        document.write("<br/>");
        document.write(JSON.stringify(data))
    }).catch((err)=>{
    console.error(err);
});
