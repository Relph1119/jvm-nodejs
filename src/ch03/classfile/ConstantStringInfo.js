/**
 * @author: HuRuiFeng
 * @file: ConstantStringInfo.js
 * @time: 2019/10/16
 * @desc: 表示java.lang.String字面量
 */

let ConstantInfo = require("./ConstantInfo").ConstantInfo;
const ConstantPool = require("./ConstantPool").ConstantPool;

class ConstantStringInfo extends ConstantInfo {
    constructor(constant_pool) {
        super();
        this.cp = new ConstantPool(constant_pool);
        this.string_index = 0;
    }

    // 读取常量池索引
    read_info(class_reader) {
        this.string_index = class_reader.read_uint16().readInt16BE(0);
    }

    toString() {
        return this.cp.get_utf8(this.string_index);
    }

}

exports.ConstantStringInfo = ConstantStringInfo;
