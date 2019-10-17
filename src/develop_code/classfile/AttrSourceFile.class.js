/**
 * @author: HuRuiFeng
 * @file: AttrSourceFile.class.js
 * @time: 2019/10/16
 * @desc:
 */

let AttributeInfo = require("./AttributeInfo.class").AttributeInfo;

class SourceFileAttribute extends AttributeInfo {
    constructor(constant_pool) {
        super();
        this.cp = constant_pool;
        this.sourceFile_index = 0;
    }

    read_info(class_reader) {
        this.sourceFile_index = class_reader.read_unit16().readInt16BE(0);
    }

    file_name() {
        return this.cp.get_utf8(this.sourceFile_index);
    }

}

exports.SourceFileAttribute = SourceFileAttribute;