let url = require('url');
let s = 'https://example.org/foo?test=1#/111';
let o = new URL(s);
console.log(o)
console.log(o.searchParams.get('test'))
console.log(url.format(o))
