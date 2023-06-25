/**
 * @author: HuRuiFeng
 * @file: Slot.js
 * @time: 2019/10/17
 * @desc: Slot类，可以容纳一个int值和一个引用值
 */

const format = require('string-format');
format.extend(String.prototype);

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
