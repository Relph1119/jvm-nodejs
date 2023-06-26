/**
 * @author: HuRuiFeng
 * @file: Numeric.js
 * @time: 2023/6/25 10:58
 * @project: jvm-nodejs
 * @desc:
 */

class Int {
    constructor(value) {
        this.__str = value.toString();
    }

    value() {
        return parseInt(this.__str);
    }
}

class Long {
    constructor(value) {
        this.__str = value.toString();
    }

    value() {
        return parseInt(this.__str)
    }
}

class Float {
    constructor(value) {
        this.__str = value.toString();
    }

    value() {
        return parseFloat(this.__str)
    }
}

class Double {
    constructor(value) {
        this.__str = value.toString();
    }

    value() {
        return parseFloat(this.__str);
    }
}

exports.Int = Int;
exports.Long = Long;
exports.Float = Float;
exports.Double = Double;
