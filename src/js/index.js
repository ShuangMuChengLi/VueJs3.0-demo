// import "../css/css.test.css";
// import "../css/less.test.less";
// const axios = require("axios");
// const config = require("../../config/config");
// const env = require("../../config/env");
for(let item of [1,2,3]){
    console.log(item)
}

(()=>{
    console.log("test")
})();

function fn() {
    let promise = new Promise((resolve , reject)=>{
        resolve("promise test")
    });
    return promise;
}
fn().then((data)=>{
    console.log(data)
})
class Animal {
    constructor(name) {
        this.name = name
    }
    say(){
        document.getElementById("result").innerHTML = this.name
    }
}
let cat = new Animal("cat")
cat.say();

async function asyncFn(){
    let data = await fn();
    console.log(data)
}
asyncFn();
