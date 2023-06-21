/**
 * @author: HuRuiFeng
 * @file: ConstantUtf8Info.js
 * @time: 2019/10/16
 * @desc: MUTF-9编码的字符串类
 */
let ConstantInfo = require("./ConstantInfo");

class ConstantUtf8Info extends ConstantInfo {
    constructor() {
        super();
        this.str = "";
    }

    // 先读取出byte[]，然后调用decode_mutf8()函数把它解码成字符串
    read_info(class_reader) {
        let length = class_reader.read_uint16().readInt16BE(0);
        if (length === 0) {
            this.str = "";
        } else {
            let bytes = class_reader.read_bytes(length);
            this.str = ConstantUtf8Info.decode_mutf8(bytes);
        }
    }


    static decode_mutf8(bytes) {
        let StringDecoder = require('string_decoder').StringDecoder;
        let decoder = new StringDecoder('utf8');
        return decoder.write(bytes);
    }
}

exports.ConstantUtf8Info = ConstantUtf8Info;
