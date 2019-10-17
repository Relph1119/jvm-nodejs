/**
 * @author: HuRuiFeng
 * @file: ClassReader.class.js
 * @time: 2019/10/15
 * @desc: 读取class文件中的字节，得到的都是Buffer
 */

class ClassReader {
    constructor(class_data) {
        this.data = class_data;
    }

    // 读取u1类型数据
    read_unit8() {
        let val = this.data.slice(0, 1);
        this.data = this.data.slice(1);
        return Buffer.from(val);
    }

    // 读取u2类型数据
    read_unit16() {
        let val = this.data.slice(0, 2);
        this.data = this.data.slice(2);
        return Buffer.from(val);
    }

    // 读取u4类型数据
    read_unit32() {
        let val = this.data.slice(0, 4);
        this.data = this.data.slice(4);
        return Buffer.from(val);
    }

    // 读取u8类型数据
    read_unit64() {
        let val = this.data.slice(0, 8);
        this.data = this.data.slice(8);
        return Buffer.from(val);
    }

    // 读取uint16表
    read_unit16s() {
        // 表的大小由开头的uint16数据指出
        let n = this.read_unit16().readInt16BE(0);
        let s = [];
        for (let i = 0; i < n; i++) {
            s[i] = this.read_unit16().readInt16BE(0);
        }
        return s;
    }

    // 读取指定数量的字节
    read_bytes(n) {
        let bytes_data = this.data.slice(0, n);
        this.data = this.data.slice(n);
        return Buffer.from(bytes_data);
    }

}

exports.ClassReader = ClassReader;