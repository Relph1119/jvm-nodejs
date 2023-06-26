/**
 * @author: HuRuiFeng
 * @file: AttrConstantValue.js
 * @time: 2019/10/16
 * @desc: 用于表示常量表达式的值
 */
const AttributeInfo = require("./AttributeInfo").AttributeInfo;

class ConstantValueAttribute extends AttributeInfo {
    constructor() {
        super();
        this.constant_value_index = 0;
    }

    read_info(class_reader) {
        this.constant_value_index = class_reader.read_uint16().readInt16BE(0);
    }
}

exports.ConstantValueAttribute = ConstantValueAttribute;
