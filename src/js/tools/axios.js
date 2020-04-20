import http from 'axios';
import {util} from './util';
import {getCookie, setCookie, removeCookie} from './cookie-util';
import urlUtil from 'url';
import querystring from 'querystring';

/**
 * 往url中添加query参数
 * @param url
 * @param query
 * @returns {*}
 */
function addQueryToUrl(url, query){
  if(typeof url !== 'string')return '';

  let urlObj = urlUtil.parse(url, true);
  if(typeof query === 'string'){
    query = querystring.parse(query);
  }
  if(!urlObj.query){
    urlObj.query = query;
  }else{
    for(let key in query){
      urlObj.query[key] = query[key];
    }
  }
  delete urlObj.path;
  delete urlObj.href;
  delete urlObj.search;
  return urlUtil.format(urlObj);
}
/**
 * 构建数据格式,默认form提交
 * @param inputData 数据
 * @param inputOption  http选项
 * @returns {*}
 */
let getParams = (inputData, inputOption)=>{
  let type = typeof inputData;
  if (type === 'string') {
    return inputData;
  }
  let ContentType = inputOption && inputOption.headers && inputOption.headers['Content-Type'];
  if(!ContentType) {
    // 默认Form提交
    return util.noNoneGetParams(inputData);
  }
  // JSON提交
  if(ContentType.indexOf('application/json') !== -1) {
    return util.noNoneGetParams(inputData, true);
  }
  // 文件提交
  if(ContentType.indexOf('multipart/form-data') !== -1){
    return inputData;
  }
  // 默认Form提交
  return util.noNoneGetParams(inputData);
};

/**
 * 构建options，添加token信息
 * @param inputOptions http选项
 * @returns {*}
 */
let getOption = (inputOptions) => {
  let Authorization = getCookie('token');
  if(!Authorization){
    return inputOptions;
  }
  if(!inputOptions) {
    return {
      headers: {
        'Authorization':Authorization
      }
    };
  }
  if(!inputOptions.headers){
    inputOptions.headers = {};
  }
  inputOptions.headers['Authorization'] = Authorization;
  return inputOptions;
};

/**
 * post put patch公用方法
 * @param type  方法：post、put、patch
 * @param url 路径
 * @param data 数据
 * @param option http选项
 * @returns {Promise<*>}
 */
async function dataMethod(type, url, data, option) {
  let params = null;
  if (data) {
    params = getParams(data, option);// 重构数据
  }
  let axiosOption = getOption(option); // 添加token

  return await http[type](url, params, axiosOption).then((res) => {
    return res;
  }).catch((e) => {
    console.error(e);
    util.handleError(e);
    throw e;
  });
}

/**
 * get delete 公用方法。将data格式化后，拼接到url后面
 * @param type  方法：get、delete
 * @param url 路径
 * @param data 数据
 * @param option http选项
 * @returns {Promise<*>}
 */
async function urlMethod(type, url, data, option) {
  if (data) {
    let params = null;
    let dataType = typeof data;
    if (dataType === 'string') {
      params = data;
    } else {
      params = util.noNoneGetParams(data);
    }
    url = addQueryToUrl(url, params);
  }
  let axiosOption = getOption(option); // 添加token
  return await http[type](url, axiosOption).then((res) => {
    return res;
  }).catch((e) => {
    util.handleError(e);
    throw e;
  });
}
export const axios = {
  /**
   * post请求
   * @param url 路径
   * @param data 数据
   * @param option http选项
   * @returns {Promise<*>}
   */
  post: async (url, data, option) => dataMethod('post', url, data, option),
  /**
   * patch请求
   * @param url 路径
   * @param data 数据
   * @param option http选项
   * @returns {Promise<*>}
   */
  patch: async (url, data, option) => dataMethod('patch', url, data, option),
  /**
   * put请求
   * @param url 路径
   * @param data 数据
   * @param option http选项
   * @returns {Promise<*>}
   */
  put: async (url, data, option) => dataMethod('put', url, data, option),
  /**
   * get请求
   * @param url 路径
   * @param data 数据
   * @param option http选项
   * @returns {Promise<*>}
   */
  get: async (url, data, option) => urlMethod('get', url, data, option),
  /**
   * delete请求
   * @param url 路径
   * @param data 数据
   * @param option http选项
   * @returns {Promise<*>}
   */
  delete: async (url, data, option) => urlMethod('delete', url, data, option),

};
