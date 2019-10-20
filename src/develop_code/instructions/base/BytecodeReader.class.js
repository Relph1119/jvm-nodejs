/**
 * @author: HuRuiFeng
 * @file: BytecodeReader.class.js
 * @time: 2019/10/17
 * @desc: 字节码读取类
 */

class BytecodeReader {
    constructor() {
        // 存放字节码
        this.code = [];
        // 记录读取到了哪个字节
        this.pc = 0;
    }

    // 为了避免每次解码指令都要新创建一个BytecodeReader实例，定义一个reset()方法
    reset(code, pc) {
        this.code = code;
        this.pc = pc;
    }

    read_uint8() {
        let i = this.get_data();
        return i.readUInt8(0);
    }

    get_data() {
        let i = this.code.slice(this.pc, this.pc + 1);
        this.pc++;
        if (i.constructor === Array){
            return Buffer.from(i);
        }
        return i;
    }

    // 读取到的值转成int8返回
    read_int8() {
        let i = this.get_data();
        return i.readInt8(0);
    }

    // 连续读取两字节
    read_uint16() {
        let byte1 = this.read_uint8();
        let byte2 = this.read_uint8();
        return Buffer.from([byte1, byte2]).readUInt16BE(0);
    }

    // 调用read_uint16()，把读取到的值转成int16返回
    read_int16() {
        let byte1 = this.read_uint8();
        let byte2 = this.read_uint8();
        return Buffer.from([byte1, byte2]).readInt16BE(0);
    }

    // 连续读取4字节
    read_int32() {
        let byte1 = this.read_uint8();
        let byte2 = this.read_uint8();
        let byte3 = this.read_uint8();
        let byte4 = this.read_uint8();
        return Buffer.from([byte1, byte2, byte3, byte4]).readInt32BE(0);
    }

    skip_padding() {
        while (this.pc % 4 !== 0) {
            this.read_uint8()
        }
    }

    read_int32s(n) {
        let ints = [];
        for (let i = 0; i < n; i++) {
            ints.push(this.read_int32());
        }
        return ints
    }
}

exports.BytecodeReader = BytecodeReader;