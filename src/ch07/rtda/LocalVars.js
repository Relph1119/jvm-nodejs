/**
 * @author: HuRuiFeng
 * @file: LocalVars.js
 * @time: 2019/10/17
 * @desc: 局部变量表，用于python的列表能存储任何数据类型，所以将基本数据类型和引用类型都用一个Slot表示。
 */

let format = require('string-format');
format.extend(String.prototype);
let Slot = require("./Slot").Slot;

class LocalVars extends Array {
    constructor(max_locals) {
        super(max_locals).fill(null);
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

    set_slot(index, slot) {
        this[index] = slot;
    }

    toString() {
        return "slots:{0}".format("[ " + this.map((value) => value.toString()).join(', ') + " ]");
    }
}

exports.LocalVars = LocalVars;
