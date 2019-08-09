import './index.html';

// TODO:　继续手写apply与bind
// 手写call
Function.prototype.myCall = function(context, ...props) {
  if (context === null || context === undefined) {
    context = window;
  } else {
    context = Object(context);
  }
  const specialProperty = Symbol('');
  context[specialProperty] = this;
  let foo = this;
  console.log(foo, this, context[specialProperty], context[specialProperty] === foo);
  // let result = foo(...props);
  let result = context[specialProperty](...props);
  delete context[specialProperty];
  return result;
}

const str = 'agldsbgakgbwr';
console.log(String.prototype.split.myCall(str, ''));


// 使用call方法进行类型判断
function isType(data, type) {
  const typeObj = {
    '[object String]': 'string',
    '[object Number]': 'number',
    '[object Boolean]': 'boolean',
    '[object Null]': 'null',
    '[object Undefined]': 'undefined',
    '[object Object]': 'object',
    '[object Array]': 'array',
    '[object Function]': 'function',
    '[object Date]': 'date', // Object.prototype.toString.call(new Date())
    '[object RegExp]': 'regExp',
    '[object Map]': 'map',
    '[object Set]': 'set',
    '[object HTMLDivElement]': 'dom', // document.querySelector('#app')
    '[object WeakMap]': 'weakMap',
    '[object Window]': 'window', // Object.prototype.toString.call(window)
    '[object Error]': 'error', // new Error('1')
    '[object Arguments]': 'arguments'
  }
  let name = Object
    .prototype
    .toString
    .call(data) // 借用Object.prototype.toString()获取数据类型
  let typeName = typeObj[name] || '未知类型' // 匹配数据类型
  return typeName === type // 判断该数据类型是否为传入的类型
}
// console.log(isType({}, 'object'), // true
//     isType([], 'array'), // true
//     isType(new Date(), 'object'), // false
//     isType(new Date(), 'date'), // true
// )