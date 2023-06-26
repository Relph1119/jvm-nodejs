/**
 * @author: HuRuiFeng
 * @file: AttributeInfo.js
 * @time: 2019/10/16
 * @desc: 属性表类
 */


class AttributeInfo {
    read_info(class_reader) {
    }

    // 读取属性表
    static read_attributes(class_reader, constant_pool) {
        let attributes_count = class_reader.read_uint16().readInt16BE(0);
        let attributes = [];
        for (let i = 0; i < attributes_count; i++) {
            attributes[i] = AttributeInfo.read_attribute(class_reader, constant_pool);
        }
        return attributes
    }

    static read_attribute(class_reader, constant_pool) {
        let attr_name_index = class_reader.read_uint16().readInt16BE(0);
        let attr_name = "";
        if (attr_name_index !== 0) {
            attr_name = constant_pool.get_utf8(attr_name_index);
        }
        let attr_len = class_reader.read_uint32().readInt32BE(0);
        let attr_info = AttributeInfo.new_attribute_info(attr_name, attr_len, constant_pool);
        attr_info.read_info(class_reader);
        return attr_info
    }

    static new_attribute_info(attr_name, attr_len, constant_pool) {
        const UnparsedAttribute = require("./AttrUnparsed").UnparsedAttribute;
        const DeprecatedAttribute = require("./AttrMarker").DeprecatedAttribute;
        const SyntheticAttribute = require("./AttrMarker").SyntheticAttribute;
        const SourceFileAttribute = require("./AttrSourceFile").SourceFileAttribute;
        const ConstantValueAttribute = require("./AttrConstantValue").ConstantValueAttribute;
        const CodeAttribute = require("./AttrCode").CodeAttribute;
        const ExceptionsAttribute = require("./AttrExceptions").ExceptionsAttribute;
        const LineNumberTableAttribute = require("./AttrLineNumberTable").LineNumberTableAttribute;
        const LocalVariableTableAttribute = require("./AttrLocalVariableTable").LocalVariableTableAttribute;

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

exports.AttributeInfo = AttributeInfo;
