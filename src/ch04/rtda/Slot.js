/**
 * @author: HuRuiFeng
 * @file: Slot.js
 * @time: 2019/10/17
 * @desc: Slot类，可以容纳一个int值和一个引用值
 */

const format = require('string-format');
format.extend(String.prototype);
const Int = require('./Numeric').Int;

class Slot {
    constructor() {
        // 存放整数
        this.num = new Int(0);
        // 存放引用
        this.ref = null;
    }

    toString() {
        return "num:{0} ref:{1}".format(this.num.value(), this.ref);
    }
}

module.exports = {
    Slot: Slot
};
