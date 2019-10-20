/**
 * @author: HuRuiFeng
 * @file: test.js
 * @time: 2019/10/20 0:41
 * @desc:
 */

// var fnv = require('fnv-plus');
// console.log(fnv.hash(new A(4).toString(), 32).dec());

// a = "java/lang/Object";
// console.log(a.replace(/\//g, "."));


// let method_name = "b";
//
// let md = require('./test1');
// Object.getOwnPropertyDescriptors(md)[method_name].value.call();

// for(let fun_name of Object.getOwnPropertyNames(md)){
//     console.log(fun_name);
// }

// const struct = require('python-struct');
// a = struct.unpack('>l', struct.pack('>f', 2.5))[0];
// console.log(a);

a = "abc";
console.log(a.split('').map((c) => c.charCodeAt()));

