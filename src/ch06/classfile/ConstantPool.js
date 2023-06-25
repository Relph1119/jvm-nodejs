/**
 * @author: HuRuiFeng
 * @file: ConstantPool.js
 * @time: 2019/10/15
 * @desc: 常量池类
 */


class ConstantPool {
    constructor(cp) {
        if (!cp) {
            cp = []
        }
        this.cp = cp;
    }

    read_constant_pool(class_reader) {
        const ConstantInfo = require("./ConstantInfo").ConstantInfo;
        const ConstantDoubleInfo = require("./CpNumeric").ConstantDoubleInfo;
        const ConstantLongInfo = require("./CpNumeric").ConstantLongInfo;

        let cp_count = class_reader.read_uint16().readUInt16BE(0);
        this.cp = Array(cp_count).fill(null).map(() => 0);

        // 索引从1开始
        for (let i = 1; i < cp_count;) {
            this.cp[i] = ConstantInfo.read_constant_info(class_reader, this.cp);
            if ((this.cp[i] instanceof ConstantLongInfo) || (this.cp[i] instanceof ConstantDoubleInfo)) {
                i++;
            }
            i++;
        }
    }

    // 按索引查找常量
    get_constant_info(index) {
        let cp_info = this.cp[index];
        if (cp_info != null) {
            return cp_info;
        } else {
            throw new Error("Invalid constant pool index!");
        }
    }

    // 从常量池查找字段或方法的名字和描述符
    get_name_and_type(index) {
        let nt_info = this.get_constant_info(index);
        let name = this.get_utf8(nt_info.name_index);
        let _type = this.get_utf8(nt_info.descriptor_index);
        return {name: name, type: _type};
    }

    // 从常量池查找类名
    get_class_name(index) {
        let class_info = this.get_constant_info(index);
        return this.get_utf8(class_info.name_index);
    }

    // 从常量池查找UTF-8字符串
    get_utf8(index) {
        let utf8_info = this.get_constant_info(index);
        return utf8_info.str;
    }

}

exports.ConstantPool = ConstantPool;
