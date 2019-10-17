/**
 * @author: HuRuiFeng
 * @file: AttrUnparsed.class.js
 * @time: 2019/10/16
 * @desc: 未解析的属性
 */

let AttributeInfo = require('./AttributeInfo.class');

class UnparsedAttribute extends AttributeInfo {
    constructor(attr_name, attr_len) {
        super();
        this.name = attr_name;
        this.length = attr_len;
        this.info = "";
    }

    read_info(class_reader) {
        this.info = class_reader.read_bytes(this.length);
    }

}

module.exports = UnparsedAttribute;