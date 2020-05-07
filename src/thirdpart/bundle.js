(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory()
    : typeof define === 'function' && define.amd ? define(factory)
      : (global = global || self, global.my = factory())
}(this, function () {
  'use strict'

  const s = 'hello world'
  console.log(s)

  return s
}))
