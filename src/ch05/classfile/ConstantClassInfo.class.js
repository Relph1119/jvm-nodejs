/**
 * @author: HuRuiFeng
 * @file: ConstantClassInfo.class.js
 * @time: 2019/10/16
 * @desc: 表示类或者接口的符号引用
 */

let ConstantInfo = require("./ConstantInfo.class").ConstantInfo;
const ConstantPool = require("./ConstantPool.class").ConstantPool;

class ConstantClassInfo extends ConstantInfo {
    constructor(constant_pool) {
        super();
        this.cp = new ConstantPool(constant_pool);
        this.name_index = 0;
    }

    read_info(class_reader) {
        this.name_index = class_reader.read_uint16().readInt16BE(0);
    }

    name() {
        return this.cp.get_utf8(this.name_index);
    }
}

exports.ConstantClassInfo = ConstantClassInfo;