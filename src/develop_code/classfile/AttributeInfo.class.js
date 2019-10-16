/**
 * @author: HuRuiFeng
 * @file: AttributeInfo.class.js
 * @time: 2019/10/16
 * @desc: 属性表类
 */



class AttributeInfo {
    read_info(class_reader) {
    }

    // 读取属性表
    static read_attributes(class_reader, constant_pool) {
        let attributes_count = class_reader.read_unit16().readInt16BE(0);
        let attributes = [];
        for (let i = 0; i < attributes_count; i++) {
            attributes[i] = AttributeInfo.read_attribute(class_reader, constant_pool);
        }
        return attributes
    }

    static read_attribute(class_reader, constant_pool) {
        let attr_name_index = class_reader.read_unit16().readInt16BE(0);
        let attr_name = "";
        if (attr_name_index !== 0) {
            attr_name = constant_pool.get_utf8(attr_name_index);
        }
        let attr_len = class_reader.read_unit32().readInt32BE(0);
        let attr_info = AttributeInfo.new_attribute_info(attr_name, attr_len, constant_pool);
        attr_info.read_info(class_reader);
        return attr_info
    }

    static new_attribute_info(attr_name, attr_len, constant_pool) {
        let UnparsedAttribute = require('./AttrUnparsed.class');
        const DeprecatedAttribute = require("./AttrMarker.class").DeprecatedAttribute;
        const SyntheticAttribute = require("./AttrMarker.class").SyntheticAttribute;
        let SourceFileAttribute = require('./AttrSourceFile.class');
        let ConstantValueAttribute = require('./AttrConstantValue.class');
        const CodeAttribute = require("./AttrCode.class").CodeAttribute;
        let ExceptionsAttribute = require('./AttrExceptions.class');
        const LineNumberTableAttribute = require("./AttrLineNumberTable.class").LineNumberTableAttribute;
        const LocalVariableTableAttribute = require("./AttrLocalVariableTable.class").LocalVariableTableAttribute;

        switch (attr_name) {
            case "Code":
                return new CodeAttribute(constant_pool);
            case "ConstantValue":
                return new ConstantValueAttribute();
            case "Deprecated":
                return new DeprecatedAttribute();
            case "Exceptions":
                return new ExceptionsAttribute();
            case "LineNumberTable":
                return new LineNumberTableAttribute();
            case "LocalVariableTable":
                return new LocalVariableTableAttribute();
            case "SourceFile":
                return new SourceFileAttribute();
            case "Synthetic":
                return new SyntheticAttribute();
            default:
                return new UnparsedAttribute(attr_name, attr_len);
        }
    }

}

module.exports = AttributeInfo;
