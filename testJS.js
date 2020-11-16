// 测试：js的Object的解构赋值

let obj = { a: { b: 123 } };
let obj2 = { ...obj };
// let obj2 = obj;
obj2.a = { b: 2 };
console.log(obj, obj2);
