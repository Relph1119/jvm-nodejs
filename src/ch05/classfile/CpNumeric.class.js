/**
 * @author: HuRuiFeng
 * @file: CpNumeric.class.js
 * @time: 2019/10/15
 * @desc: 用一个module编写数值常量类
 */

let ConstantInfo = require("./ConstantInfo.class").ConstantInfo;
let bufferUtils = require('../utils/bufferUtil');

// 使用4字节存储整数常量
class ConstantIntegerInfo extends ConstantInfo {
    constructor() {
        super();
        this.val = 0;
    }

    // 先读取一个uint32数据，然后把它转型成int32类型
    read_info(class_reader) {
        this.val = class_reader.read_unit32().readInt32BE(0);
    }

}

// 使用4字节存储IEEE754单精度浮点数常量
class ConstantFloatInfo extends ConstantInfo {
    constructor() {
        super();
        this.val = 0.0;
    }

    read_info(class_reader) {
        this.val = class_reader.read_unit32().readFloatBE(0);
    }
}

// 使用8字节存储整数常量
class ConstantLongInfo extends ConstantInfo {
    constructor() {
        super();
        this.val = 0;
    }

    read_info(class_reader) {
        let byte_data = class_reader.read_unit64();
        const view = new DataView(bufferUtils.toArrayBuffer(byte_data));
        this.val = view.getBigInt64(0);
    }
}

// 使用8字节存储IEEE754双精度浮点数
class ConstantDoubleInfo extends ConstantInfo {
    constructor() {
        super();
        this.val = 0.0
    }

    read_info(class_reader) {
        this.val = class_reader.read_unit32().readDoubleBE(0);
    }
}

module.exports = {
    ConstantIntegerInfo: ConstantIntegerInfo,
    ConstantFloatInfo: ConstantFloatInfo,
    ConstantLongInfo: ConstantLongInfo,
    ConstantDoubleInfo: ConstantDoubleInfo
};

