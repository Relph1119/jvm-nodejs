/**
 * @author: HuRuiFeng
 * @file: AttrLocalVariableTypeTable.class.js
 * @time: 2019/10/16
 * @desc: LocalVariableTypeTable属性类型表中存放方法的局部变量类型信息
 */

let AttributeInfo = require("./AttributeInfo.class").AttributeInfo;

class LocalVariableTypeTableAttribute extends AttributeInfo {
    constructor() {
        super();
        this.localVariableTable = []
    }

    read_info(class_reader) {
        let local_variable_table_length = class_reader.read_uint16().readInt16BE(0);
        this.localVariableTable = Array(local_variable_table_length).fill(null).map(() => null);
        for (let i = 0; i < local_variable_table_length; i++) {
            let local_variable_type_table_entry = new LocalVariableTypeTableEntry();
            local_variable_type_table_entry.start_pc = class_reader.read_uint16().readInt16BE(0);
            local_variable_type_table_entry.length = class_reader.read_uint16().readInt16BE(0);
            local_variable_type_table_entry.name_index = class_reader.read_uint16().readInt16BE(0);
            local_variable_type_table_entry.signature_index = class_reader.read_uint16().readInt16BE(0);
            local_variable_type_table_entry.index = class_reader.read_uint16().readInt16BE(0);
            this.localVariableTable[i] = local_variable_type_table_entry;
        }
    }

}

class LocalVariableTypeTableEntry {
    constructor() {
        this.start_pc = 0;
        this.length = 0;
        this.name_index = 0;
        this.signature_index = 0;
        this.index = 0;
    }
}

module.exports = {
    LocalVariableTypeTableAttribute: LocalVariableTypeTableAttribute,
    LocalVariableTypeTableEntry: LocalVariableTypeTableEntry
};
