/**
 * @author: HuRuiFeng
 * @file: ConstantNameAndTypeInfo.class.js
 * @time: 2019/10/16
 * @desc: 表示字段或方法的名称和描述符
 */
let ConstantInfo = require("./ConstantInfo.class").ConstantInfo;

class ConstantNameAndTypeInfo extends ConstantInfo {
    constructor() {
        super();
        this.name_index = 0;
        this.descriptor_index = 0;
    }

    read_info(class_reader) {
        this.name_index = class_reader.read_uint16().readInt16BE(0);
        this.descriptor_index = class_reader.read_uint16().readInt16BE(0);
    }

}

exports.ConstantNameAndTypeInfo = ConstantNameAndTypeInfo;