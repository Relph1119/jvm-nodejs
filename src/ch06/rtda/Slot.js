/**
 * @author: HuRuiFeng
 * @file: Slot.js
 * @time: 2019/10/17
 * @desc: Slot类，可以容纳一个int值和一个引用值
 */

const format = require('string-format');
format.extend(String.prototype);
const Int = require('./Numeric').Int;
let Long = require("./Numeric").Long
let Float = require("./Numeric").Float
let Double = require("./Numeric").Double

class Slot {
    constructor() {
        // 存放整数
        this.num = new Int(0);
        // 存放引用
        this.ref = null;
    }

    toString() {
        return "num:{0} ref:{1}".format(this.num, this.ref);
    }
}

class Slots extends Array {
    constructor(slot_count = 1) {
        super(slot_count).fill(null);
        for (let i = 0; i < this.length; i++) {
            this[i] = new Slot();
        }
    }

    set_int(index, val) {
        this[index].num = new Int(val);
    }

    get_int(index, val) {
        return this[index].num.value()
    }

    set_long(index, val) {
        this[index].num = new Long(val);
    }

    get_long(index, val) {
        return this[index].num.value()
    }

    set_float(index, val) {
        this[index].num = new Float(val);
    }

    get_float(index, val) {
        return this[index].num.value()
    }

    set_double(index, val) {
        this[index].num = new Double(val);
    }

    get_double(index, val) {
        return this[index].num.value()
    }

    set_ref(index, ref) {
        this[index].ref = ref;
    }

    get_ref(index) {
        return this[index].ref;
    }
}

module.exports = {
    Slot: Slot,
    Slots: Slots
};
