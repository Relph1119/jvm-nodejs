/**
 * @author: HuRuiFeng
 * @file: MemberInfo.js
 * @time: 2019/10/15
 * @desc: 统一的类表示字段和方法
 */

const CodeAttribute = require("./AttrCode").CodeAttribute;

class MemberInfo {
    constructor(constant_pool) {
        this.cp = constant_pool;
        this.access_flags = "";
        this.name_index = "";
        this.descriptor_index = "";
        this.attributes = [];
    }

    // 读取字段表或方法表
    static read_members(class_reader, constant_pool) {
        let member_count = class_reader.read_uint16().readUInt16BE(0);
        let members = [];
        for (let i = 0; i < member_count; i++) {
            members[i] = MemberInfo.read_member(class_reader, constant_pool)
        }
        return members
    }

    // 读取字段或方法数据
    static read_member(class_reader, constant_pool) {
        const AttributeInfo = require("./AttributeInfo").AttributeInfo;

        // 初始化MemberInfo对象
        let member = new MemberInfo(constant_pool);
        member.access_flags = class_reader.read_uint16().readUInt16BE(0);
        member.name_index = class_reader.read_uint16().readUInt16BE(0);
        member.descriptor_index = class_reader.read_uint16().readUInt16BE(0);
        member.attributes = AttributeInfo.read_attributes(class_reader, constant_pool);
        return member
    }

    // 从常量池查找字段或方法名
    name() {
        return this.cp.get_utf8(this.name_index)
    }

    // 从常量池查找字段或方法描述符
    descriptor() {
        return this.cp.get_utf8(this.descriptor_index)
    }

    // 得到MemberInfo的Code属性
    code_attribute() {
        for (let attrInfo of this.attributes) {
            if (attrInfo.constructor === CodeAttribute) {
                return attrInfo;
            }
        }
        return null;
    }

}

exports.MemberInfo = MemberInfo;
