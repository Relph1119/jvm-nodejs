/**
 * @author: HuRuiFeng
 * @file: Numeric.js
 * @time: 2023/6/25 10:58
 * @project: jvm-nodejs
 * @desc: 该类的主要作用是用String类型保留原始的数据类型，当需要获取时，再进行数据类型转换
 */

class Int {
    constructor(value) {
        this.__str = value.toString();
    }

    value() {
        return parseInt(this.__str);
    }

    toString() {
        return this.__str;
    }
}

class Long {
    constructor(value) {
        this.__str = value.toString();
    }

    value() {
        return parseInt(this.__str)
    }

    toString() {
        return this.__str;
    }
}

class Float {
    constructor(value) {
        this.__str = value.toString();
    }

    value() {
        return parseFloat(this.__str)
    }

    toString() {
        return this.__str;
    }
}

class Double {
    constructor(value) {
        this.__str = value.toString();
    }

    value() {
        return parseFloat(this.__str);
    }

    toString() {
        return this.__str;
    }
}

exports.Int = Int;
exports.Long = Long;
exports.Float = Float;
exports.Double = Double;
