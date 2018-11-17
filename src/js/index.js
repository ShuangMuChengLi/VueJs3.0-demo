import "../css/css.test.css";
import "../css/less.test.less";
import {file} from "./globals.js"
const axios = require("axios");
const config = require("../../config/config");
const env = require("../../config/env");

axios.post(config.api_local + "/captureInfo/getCaptureInfoCount").then((data) => {
    document.getElementById("result").innerHTML = JSON.stringify(data);
    document.getElementById("env").innerHTML = env;
    console.log(file);
}).catch((err) => {
    console.error(err);
});
