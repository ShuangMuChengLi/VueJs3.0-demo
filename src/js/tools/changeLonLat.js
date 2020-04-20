let _ = require('lodash');
// let a = [{lonLat:1}]
// let b = [1, 2, 3]
// let result = _.has(a ,'1.lonLat');
// console.log(result)
function changeLonLat(list){
  if(_.isEmpty(list)) return list;

  function conversionToNum(longitude, latitude){
    return [Number(longitude), Number(latitude)];
  }

  function checkIsNan(list){
    for (let item of list ){
      // isNan 会进行隐式转化数字再判断， 由于前面已经进行了转化为数字，此处不再检验
      if(isNaN(item)){
        return false;
      }
    }

    return true;
  }

  let newList = [];
  //抽样获取输入数据中的经纬度以何种形式存储 --- lonlat（数组形式） ; lon,lat （键值对）; longitude,latitude（键值对）
  let hasLonLat = _.has(list, '0.lonLat');
  let hasLon = _.has(list, '0.lon') && _.has(list, '0.lat');
  let hasLongitude = _.has(list, '0.longitude') && _.has(list, '0.latitude');

  let isNumber; // 是数字类型
  let firstLon; //获取第一个数据
  let longitude;
  let latitude;

  if(hasLonLat){
    firstLon = _.get(list, '0.lonLat.0'); //lonLat是数组形式
  }else if(hasLon){
    firstLon = _.get(list, '0.lon');
    longitude = 'lon';
    latitude = 'lat';
  }else{
    firstLon = _.get(list, '0.longitude');
    longitude = 'longitude';
    latitude = 'latitude';
  }

  isNumber = _.isNumber(firstLon);

  if(hasLonLat && isNumber){
    return list;
  }

  for(let item of list){
    if(isNumber){
      let lon = item[longitude];
      let lat = item[latitude];
      item.lonLat = [lon, lat];
      newList.push(item);
      continue;
    }

    if(hasLon || hasLongitude){
      item.lonLat = conversionToNum(item[longitude], item[latitude]);
      if(! checkIsNan(item.lonLat)) continue; //存在nan

      newList.push(item);
      continue;
    }

    item.lonLat = conversionToNum(item.lonLat[0], item.lonLat[1]);
    if(! checkIsNan(item.lonLat)) continue; //存在nan

    newList.push(item);
  }

  return newList;
}



module.exports = changeLonLat;
