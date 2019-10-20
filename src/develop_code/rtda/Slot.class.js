/**
 * @author: HuRuiFeng
 * @file: Slot.class.js
 * @time: 2019/10/17
 * @desc: Slot类，可以容纳一个int值和一个引用值
 */

let format = require('string-format');
format.extend(String.prototype);
const struct = require('python-struct');

class Slot {
    constructor() {
        // 存放整数
        this.num = 0;
        /// 存放引用
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

    set_numeric(index, val) {
        this[index].num = val;
    }

    get_numeric(index) {
        return this[index].num;
    }

    set_double(index, val) {
        val = struct.unpack('>q', struct.pack('>d', val))[0];
        this.set_numeric(index, val)
    }

    get_double(index) {
        let val = this.get_numeric(index);
        return struct.unpack('>d', struct.pack('>q', val))[0]
    }

    set_float(index, val) {
        val = struct.unpack('>l', struct.pack('>f', val))[0];
        this.set_numeric(index, val);
    }

    get_float(index) {
        let val = this.get_numeric(index);
        return struct.unpack('>f', struct.pack('>l', val))[0];
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