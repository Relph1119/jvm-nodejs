/**
 * @author: HuRuiFeng
 * @file: AttrConstantValue.class.js
 * @time: 2019/10/16
 * @desc: 用于表示常量表达式的值
 */
let AttributeInfo = require('./AttributeInfo.class');

class ConstantValueAttribute extends AttributeInfo {
    constructor() {
        super();
        this.constant_value_index = 0;
    }

    read_info(class_reader) {
        this.constant_value_index = class_reader.read_unit16().readInt16BE(0);
    }
}

module.exports = ConstantValueAttribute;