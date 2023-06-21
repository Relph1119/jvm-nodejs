/**
 * @author: HuRuiFeng
 * @file: Object.js
 * @time: 2019/10/17
 * @desc: 表示对象
 */

const Slots = require("../Slot").Slots;

class Object {
    constructor(clazz) {
        // 存放对象的class
        this._class = clazz;
        // 存放实例变量
        this.fields = new Slots(clazz.instance_slot_count);
    }

    get_class() {
        return this._class;
    }

    set_class(value) {
        this._class = value;
    }

    is_instance_of(clazz) {
        return clazz.is_assignable_from(this._class);
    }
}

exports.ObjectClass = Object;
