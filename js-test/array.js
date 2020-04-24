const a = ['name', 'power'];
const sortOrders = a.reduce((o, key) => {
  console.log(o, key);
  o[key] = 1;
  return o;
}, {});
console.log(sortOrders);
