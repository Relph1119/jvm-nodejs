/**
 * @author: HuRuiFeng
 * @file: CpMethodRef.js
 * @time: 2019/10/18 16:13
 * @desc: 类符号引用
 */

const SymRef = require("./CpSymRef").SymRef;

class ClassRef extends SymRef {
    constructor(constant_pool, class_info) {
        super();
        this.cp = constant_pool;
        this.class_name = class_info.name();
    }

}

exports.ClassRef = ClassRef;
