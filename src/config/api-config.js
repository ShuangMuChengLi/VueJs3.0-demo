import config from './config.json';
/**
 * axios中JSON提交的config配置
 * @type {{headers: {Content-Type: string}}}
 */
export const JSONHeader = {
  headers:{
    'Content-Type':'application/json'
  }
};
/**
 * axios中multipart/form-data提交的config配置
 * @type {{headers: {Content-Type: string}}}
 */
export const fileHeader = {
  headers:{
    'Content-Type':'multipart/form-data'
  }
};
/**
 * 接口配置
 * @type {{alarmInfo: {alarmInfoStatisticsByType: string}}}
 */
export const api = {
  'alarmInfo':{
    'alarmInfoStatisticsByType':config.api_local + '/alarmInfo/alarmInfoStatisticsByType', // 获取告警信息(demo  可删除）
  }
};
