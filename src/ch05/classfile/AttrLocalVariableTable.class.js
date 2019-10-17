/**
 * @author: HuRuiFeng
 * @file: AttrLocalVariableTable.class.js
 * @time: 2019/10/16
 * @desc: LocalVariableTable属性表中存放方法的局部变量信息
 */

let AttributeInfo = require("./AttributeInfo.class").AttributeInfo;

class LocalVariableTableAttribute extends AttributeInfo {
    constructor() {
        super();
        this.localVariableTable = []
    }

    read_info(class_reader) {
        let local_variable_table_length = class_reader.read_unit16().readInt16BE(0);

        for (let i = 0; i < local_variable_table_length; i++) {
            let local_variable_table_entry = new LocalVariableTableEntry();
            local_variable_table_entry.start_pc = class_reader.read_unit16().readInt16BE(0);
            local_variable_table_entry.length = class_reader.read_unit16().readInt16BE(0);
            local_variable_table_entry.name_index = class_reader.read_unit16().readInt16BE(0);
            local_variable_table_entry.descriptor_index = class_reader.read_unit16().readInt16BE(0);
            local_variable_table_entry.index = class_reader.read_unit16().readInt16BE(0);
            this.localVariableTable[i] = local_variable_table_entry;
        }
    }

}

class LocalVariableTableEntry {
    constructor() {
        this.start_pc = 0;
        this.length = 0;
        this.name_index = 0;
        this.descriptor_index = 0;
        this.index = 0;
    }

}

module.exports = {
    LocalVariableTableAttribute: LocalVariableTableAttribute,
    LocalVariableTableEntry: LocalVariableTableEntry
};