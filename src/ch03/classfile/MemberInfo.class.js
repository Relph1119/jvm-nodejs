/**
 * @author: HuRuiFeng
 * @file: MemberInfo.class.js
 * @time: 2019/10/15
 * @desc: 统一的类表示字段和方法
 */

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
        let member_count = class_reader.read_unit16().readUInt16BE(0);
        let members = [];
        for (let i = 0; i < member_count; i++) {
            members[i] = MemberInfo.read_member(class_reader, constant_pool)
        }
        return members
    }

    // 读取字段或方法数据
    static read_member(class_reader, constant_pool) {
        let AttributeInfo = require('./AttributeInfo.class');

        // 初始化MemberInfo对象
        let member = new MemberInfo(constant_pool);
        member.access_flags = class_reader.read_unit16();
        member.name_index = class_reader.read_unit16().readUInt16BE();
        member.descriptor_index = class_reader.read_unit16().readUInt16BE();
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
}

module.exports = MemberInfo;