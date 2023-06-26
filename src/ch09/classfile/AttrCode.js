/**
 * @author: HuRuiFeng
 * @file: AttrCode.js
 * @time: 2019/10/16
 * @desc: Code属性存放字节码等方法相关信息
 */

const AttributeInfo = require("./AttributeInfo").AttributeInfo;

class CodeAttribute extends AttributeInfo {
    constructor(constant_pool) {
        super();
        this.cp = constant_pool;
        // 操作数栈的最大深度
        this.max_stack = 0;
        // 局部变量表大小
        this.max_locals = 0;
        // 字节码，存在u1表中
        this.code = null;
        // 异常处理表
        this.exception_table = [];
        // 属性表
        this.attributes = [];
    }

    read_info(class_reader) {
        this.max_stack = class_reader.read_uint16().readInt16BE(0);
        this.max_locals = class_reader.read_uint16().readInt16BE(0);
        let code_length = class_reader.read_uint32().readInt32BE(0);
        this.code = class_reader.read_bytes(code_length);
        this.exception_table = CodeAttribute.read_exception_table(class_reader);
        this.attributes = AttributeInfo.read_attributes(class_reader, this.cp);
    }

    static read_exception_table(class_reader) {
        let exception_table_length = class_reader.read_uint16().readInt16BE(0);
        let exception_table = [];
        for (let i = 0; i < exception_table_length; i++) {
            let exception_table_entry = new ExceptionTableEntry();
            exception_table_entry.start_pc = class_reader.read_uint16().readInt16BE(0);
            exception_table_entry.end_pc = class_reader.read_uint16().readInt16BE(0);
            exception_table_entry.handler_pc = class_reader.read_uint16().readInt16BE(0);
            exception_table_entry.catch_type = class_reader.read_uint16().readInt16BE(0);
            exception_table[i] = exception_table_entry;
        }
        return exception_table
    }


}

// 异常处理表实体类
class ExceptionTableEntry {
    constructor() {
        this.start_pc = 0;
        this.end_pc = 0;
        this.handler_pc = 0;
        this.catch_type = 0;
    }
}

module.exports = {
    CodeAttribute: CodeAttribute,
    ExceptionTableEntry: ExceptionTableEntry
};
