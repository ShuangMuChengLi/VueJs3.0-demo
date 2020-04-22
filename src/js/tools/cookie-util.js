/**
 * Created by linchaoqun on 2017/4/10.
 */
export const getCookie = function (name) {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(name + '=');
    if (start !== -1) {
      start = start + name.length + 1;
      let end = document.cookie.indexOf(';', start);
      if (end === -1) end = document.cookie.length;
      return decodeURI(document.cookie.substring(start, end));
    }
  }
  return '';
};

export const setCookie = function setCookie (name, value, expiredays, path) {
  const exdate = new Date();
  const cookieKeyValue = name + '=' + encodeURI(value);
  let expiredaysString = '';
  let pathString = '';
  if (expiredays) {
    exdate.setDate(exdate.getDate() + expiredays);
    expiredaysString = ';expires=' + exdate.toGMTString();
  }
  if (path) {
    pathString = ';Path=' + path;
  }
  document.cookie = cookieKeyValue + expiredaysString + pathString;
};

export const removeCookie = function setCookie (name) {
  const exdate = new Date();
  exdate.setDate(exdate.getDate() - 1000);
  document.cookie = name + '=null;expires=' + exdate.toGMTString();
};
