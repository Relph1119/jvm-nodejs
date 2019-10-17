/**
 * @author: HuRuiFeng
 * @file: OperandStack.class.js
 * @time: 2019/10/17
 * @desc: 操作数栈，用于python的列表能存储任何数据类型，所以将基本数据类型和引用类型都用一个Slot表示。
 */

let format = require('string-format');
format.extend(String.prototype);
let Slot = require("./Slot.class").Slot;

class OperandStack {
    constructor(max_stack) {
        this.slots = [];
        if (max_stack > 0) {
            this.slots = Array(max_stack).fill(null);
            for (let i = 0; i < this.slots.length; i++) {
                this.slots[i] = new Slot();
            }
        }
        this.size = 0;
    }

    push_numeric(val) {
        this.slots[this.size].num = val;
        this.size++;
    }

    pop_numeric() {
        this.size -= 1;
        return this.slots[this.size].num;
    }

    push_ref(ref) {
        this.slots[this.size].ref = ref;
        this.size++;
    }

    pop_ref() {
        this.size--;
        let ref = this.slots[this.size].ref;
        this.slots[this.size].ref = null;
        return ref;
    }

    push_slot(slot) {
        this.slots[this.size] = slot;
        this.size++;
    }

    pop_slot() {
        this.size--;
        return this.slots[this.size];
    }

    toString() {
        return "size:{0} slots:{1}".format(this.size, "[ " + this.slots.map((value) => value.toString()).join(', ') + " ]");
    }

}

exports.OperandStack = OperandStack;