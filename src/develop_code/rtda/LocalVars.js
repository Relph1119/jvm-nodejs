/**
 * @author: HuRuiFeng
 * @file: LocalVars.js
 * @time: 2019/10/17
 * @desc: 局部变量表，用于python的列表能存储任何数据类型，所以将基本数据类型和引用类型都用一个Slot表示。
 */

const format = require('string-format');
format.extend(String.prototype);
const Slot = require("./Slot").Slot;
const Int = require("./Numeric").Int
const Long = require("./Numeric").Long
const Float = require("./Numeric").Float
const Double = require("./Numeric").Double


class LocalVars extends Array {
    constructor(max_locals) {
        super(max_locals).fill(null);
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

    set_slot(index, slot) {
        this[index] = slot;
    }

    get_this() {
        return this.get_ref(0);
    }

    toString() {
        return "slots:{0}".format("[ " + this.map((value) => value.toString()).join(', ') + " ]");
    }
}



exports.LocalVars = LocalVars;

