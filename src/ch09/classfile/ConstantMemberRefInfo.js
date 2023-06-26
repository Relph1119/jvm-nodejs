/**
 * @author: HuRuiFeng
 * @file: ConstantMemberRefInfo.js
 * @time: 2019/10/16
 * @desc: 对象引用类
 */

const ConstantInfo = require("./ConstantInfo").ConstantInfo;
const ConstantPool = require("./ConstantPool").ConstantPool;

class ConstantMemberRefInfo extends ConstantInfo {
    constructor(constant_pool) {
        super();
        this.cp = new ConstantPool(constant_pool);
        this.class_index = 0;
        this.name_and_type_index = 0;
    }

    read_info(class_reader) {
        this.class_index = class_reader.read_uint16().readInt16BE(0);
        this.name_and_type_index = class_reader.read_uint16().readInt16BE(0);
    }

    class_name() {
        return this.cp.get_class_name(this.class_index)
    }

    name_and_descriptor() {
        return this.cp.get_name_and_type(this.name_and_type_index);
    }
}

// 字段符号引用类
class ConstantFieldRefInfo extends ConstantMemberRefInfo {
    constructor(constant_pool) {
        super(constant_pool);
    }
}

// 普通（非接口）方法符号引用类
class ConstantMethodRefInfo extends ConstantMemberRefInfo {
    constructor(constant_pool) {
        super(constant_pool);
    }
}

// 接口方法符号引用类
class ConstantInterfaceMethodRefInfo extends ConstantMemberRefInfo {
    constructor(constant_pool) {
        super(constant_pool);
    }
}

module.exports = {
    ConstantMemberRefInfo: ConstantMemberRefInfo,
    ConstantFieldRefInfo: ConstantFieldRefInfo,
    ConstantMethodRefInfo: ConstantMethodRefInfo,
    ConstantInterfaceMethodRefInfo: ConstantInterfaceMethodRefInfo
};
