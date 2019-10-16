/**
 * @author: HuRuiFeng
 * @file: CpInvokeDynamic.class.js
 * @time: 2019/10/16
 * @desc:
 */
let ConstantInfo = require('./ConstantInfo.class');

class ConstantMethodHandleInfo extends ConstantInfo {
    constructor() {
        super();
        this.referenceKind = 0;
        this.referenceIndex = 0;
    }

    read_info(class_reader) {
        this.referenceKind = class_reader.read_unit8().readInt8(0);
        this.referenceIndex = class_reader.read_unit16().readInt16BE(0);
    }
}

class ConstantMethodTypeInfo extends ConstantInfo {
    constructor() {
        super();
        this.descriptorIndex = 0;
    }

    read_info(class_reader) {
        this.descriptorIndex = class_reader.read_unit16().readInt16BE(0);
    }
}

class ConstantInvokeDynamicInfo extends ConstantInfo {
    constructor() {
        super();
        this.bootstrapMethodAttrIndex = 0;
        this.nameAndTypeIndex = 0;
    }

    read_info(class_reader) {
        this.bootstrapMethodAttrIndex = class_reader.read_unit16().readInt16BE(0);
        this.nameAndTypeIndex = class_reader.read_unit16().readInt16BE(0);
    }
}

module.exports = {
    ConstantMethodHandleInfo: ConstantMethodHandleInfo,
    ConstantMethodTypeInfo: ConstantMethodTypeInfo,
    ConstantInvokeDynamicInfo: ConstantInvokeDynamicInfo
};



