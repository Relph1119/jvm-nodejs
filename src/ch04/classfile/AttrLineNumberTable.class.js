/**
 * @author: HuRuiFeng
 * @file: AttrLineNumberTable.class.js
 * @time: 2019/10/16
 * @desc: LineNumberTable属性表存放方法的行号信息
 */

let AttributeInfo = require("./AttributeInfo.class").AttributeInfo;

class LineNumberTableAttribute extends AttributeInfo {
    constructor() {
        super();
        this.lineNumberTable = []
    }

    read_info(class_reader) {
        let line_number_table_length = class_reader.read_unit16().readInt16BE(0);
        this.lineNumberTable = [];
        for (let i = 0; i < line_number_table_length; i++) {
            let line_number_table_entry = new LineNumberTableEntry();
            line_number_table_entry.start_pc = class_reader.read_unit16().readInt16BE(0);
            line_number_table_entry.line_number = class_reader.read_unit16().readInt16BE(0);
            this.lineNumberTable[i] = line_number_table_entry;
        }
    }

}

class LineNumberTableEntry {
    constructor() {
        this.start_pc = 0;
        this.line_number = 0;
    }
}

module.exports = {
    LineNumberTableAttribute: LineNumberTableAttribute,
    LineNumberTableEntry: LineNumberTableEntry
};