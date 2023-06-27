/**
 * @author: HuRuiFeng
 * @file: ClassFile.js
 * @time: 2019/10/15
 * @desc: 解析class文件
 */

const SourceFileAttribute = require("./AttrSourceFile").SourceFileAttribute;
const ClassReader = require("./ClassReader").ClassReader;
const ConstantPool = require("./ConstantPool").ConstantPool;
const MemberInfo = require("./MemberInfo").MemberInfo;
const AttributeInfo = require("./AttributeInfo").AttributeInfo;

class ClassFile {
    constructor() {
        // 魔数
        this.magic = "";
        // 小版本号
        this.minor_version = "";
        // 主版本号
        this.major_version = "";
        // 常量池
        this.constant_pool = null;
        // 类访问标志，用于指出class文件定义的是类还是接口，访问级别是public还是private
        this.access_flags = "";
        // 类索引
        this.this_class = "";
        // 超类索引
        this.super_class = "";
        // 接口索引表
        this.interfaces = [];
        // 变量
        this.fields = [];
        // 方法
        this.methods = [];
        // 属性
        this.attributes = [];
    }

    parse(class_data) {
        try {
            let class_reader = new ClassReader(class_data);
            this.read(class_reader);
            return {class_file: this, error: null};
        } catch (err) {
            return {class_file: this, error: err};
        }
    }

    read(class_reader) {
        ClassFile.read_and_check_magic(class_reader);
        this.read_and_check_version(class_reader);

        this.constant_pool = new ConstantPool();
        this.constant_pool.read_constant_pool(class_reader);

        this.access_flags = class_reader.read_uint16().readInt16BE(0);
        this.this_class = class_reader.read_uint16().readInt16BE(0);
        this.super_class = class_reader.read_uint16().readInt16BE(0);
        this.interfaces = class_reader.read_uint16s();

        this.fields = MemberInfo.read_members(class_reader, this.constant_pool);
        this.methods = MemberInfo.read_members(class_reader, this.constant_pool);
        this.attributes = AttributeInfo.read_attributes(class_reader, this.constant_pool);
    }

    // 读取并检查Class文件的起始字节，必须以0xCAFEBABE固定字节开头
    static read_and_check_magic(class_reader) {
        let magic = class_reader.read_uint32();
        if (!magic.equals(Buffer.from([0xca, 0xfe, 0xba, 0xbe]))) {
            throw new Error("java.lang.ClassFormatError: magic!");
        }
    }

    // 读取并检查版本号，由于采用java1.8的编译器，故支持版本号为45.0~52.0的class文件
    read_and_check_version(class_reader) {
        this.minor_version = class_reader.read_uint16().readInt16BE(0);
        this.major_version = class_reader.read_uint16().readInt16BE(0);

        if (this.major_version === 45) {
            return;
        } else if ([46, 47, 48, 49, 50, 51, 52].includes(this.major_version)) {
            if (this.minor_version === 0) {
                return
            }
        }
        throw new Error("java.lang.UnsupportedClassVersionError!")
    }

    // 从常量池中查找类名
    class_name() {
        return this.constant_pool.get_class_name(this.this_class)
    }

    // 从常量池中查找超类类名
    super_class_name() {
        if (this.super_class) {
            return this.constant_pool.get_class_name(this.super_class)
        }
        // 只有java.lang.Object没有超类
        return ""
    }

    // 从常量池中查找接口名
    interface_names() {
        return this.interfaces.map((cpName) => this.constant_pool.get_class_name(cpName))
    }

    source_file_attribute() {
        for (let attr_info of this.attributes) {
            if (attr_info.constructor === SourceFileAttribute) {
                return  attr_info;
            }
        }
        return null;
    }
}

exports.ClassFile = ClassFile;
