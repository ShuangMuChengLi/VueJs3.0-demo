let env = require("./env");
let conf = {};
if(env === "production"){
    conf.api = "/xlcloud-custody-webapp";
    conf.api_local = "/api/json";
    // conf.api_local = "/xlcloud-traffic-webapp";
}else{
    conf.api = "/xlcloud-custody-webapp";
    // conf.api_local = "/xlcloud-traffic-webapp";
    conf.api_local = "/api/json";
}
module.exports = conf;
