/**
 * @author: HuRuiFeng
 * @file: AttrExceptions.class.js
 * @time: 2019/10/16
 * @desc: 记录方法抛出的异常表
 */

let AttributeInfo = require("./AttributeInfo.class").AttributeInfo;

class ExceptionsAttribute extends AttributeInfo {
    constructor() {
        super();
        this.exception_index_table = []
    }

    read_info(class_reader) {
        this.exception_index_table = class_reader.read_uint16s();
    }

}

exports.ExceptionsAttribute = ExceptionsAttribute;