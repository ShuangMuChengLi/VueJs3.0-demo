const axios = require("axios");
const config = require("../../config/config");
import "../css/css.test.css";
import "../css/less.test.less";
axios.post(config.api_local + "/captureInfo/getCaptureInfoCount").
    then((data)=>{
        console.log(data);
        document.getElementById("result").innerHTML = JSON.stringify(data)
    }).catch((err)=>{
    console.error(err);
});
