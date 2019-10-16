/**
 * @author: HuRuiFeng
 * @file: ConstantInfo.class.js
 * @time: 2019/10/15
 * @desc: 常量类
 */




class ConstantInfo {
    static CONSTANT_Class = 7;
    static CONSTANT_FieldRef = 9;
    static CONSTANT_MethodRef = 10;
    static CONSTANT_InterfaceMethodRef = 11;
    static CONSTANT_String = 8;
    static CONSTANT_Integer = 3;
    static CONSTANT_Float = 4;
    static CONSTANT_Long = 5;
    static CONSTANT_Double = 6;
    static CONSTANT_NameAndType = 12;
    static CONSTANT_Utf8 = 1;
    static CONSTANT_MethodHandler = 15;
    static CONSTANT_MethodType = 16;
    static CONSTANT_InvokeDynamic = 18;

    read_info() {
    }

    static read_constant_info(class_reader, constant_pool) {
        let tag = class_reader.read_unit8().readInt8(0);
        let c = ConstantInfo.new_constant_info(tag, constant_pool);
        c.read_info(class_reader);
        return c
    }

    static new_constant_info(tag, constantPool) {
        const ConstantDoubleInfo = require("./CpNumeric.class").ConstantDoubleInfo;
        const ConstantLongInfo = require("./CpNumeric.class").ConstantLongInfo;
        const ConstantFloatInfo = require("./CpNumeric.class").ConstantFloatInfo;
        const ConstantIntegerInfo = require("./CpNumeric.class").ConstantIntegerInfo;
        const ConstantUtf8Info = require("./ConstantUtf8Info.class");
        const ConstantStringInfo = require('./ConstantStringInfo.class');
        const ConstantClassInfo = require('./ConstantClassInfo.class');
        const ConstantNameAndTypeInfo = require('./ConstantNameAndTypeInfo.class');
        const ConstantInterfaceMethodRefInfo = require("./ConstantMemberRefInfo.class").ConstantInterfaceMethodRefInfo;
        const ConstantMethodRefInfo = require("./ConstantMemberRefInfo.class").ConstantMethodRefInfo;
        const ConstantFieldRefInfo = require("./ConstantMemberRefInfo.class").ConstantFieldRefInfo;
        const ConstantInvokeDynamicInfo = require("./CpInvokeDynamic.class").ConstantInvokeDynamicInfo;
        const ConstantMethodTypeInfo = require("./CpInvokeDynamic.class").ConstantMethodTypeInfo;
        const ConstantMethodHandleInfo = require("./CpInvokeDynamic.class").ConstantMethodHandleInfo;

        switch (tag) {
            case ConstantInfo.CONSTANT_Integer:
                return new ConstantIntegerInfo();
            case ConstantInfo.CONSTANT_Float:
                return new ConstantFloatInfo();
            case ConstantInfo.CONSTANT_Long:
                return new ConstantLongInfo();
            case ConstantInfo.CONSTANT_Double:
                return new ConstantDoubleInfo();
            case ConstantInfo.CONSTANT_Utf8:
                return new ConstantUtf8Info();
            case ConstantInfo.CONSTANT_String:
                return new ConstantStringInfo(constantPool);
            case ConstantInfo.CONSTANT_Class:
                return new ConstantClassInfo(constantPool);
            case ConstantInfo.CONSTANT_FieldRef:
                return new ConstantFieldRefInfo(constantPool);
            case ConstantInfo.CONSTANT_MethodRef:
                return new ConstantMethodRefInfo(constantPool);
            case ConstantInfo.CONSTANT_InterfaceMethodRef:
                return new ConstantInterfaceMethodRefInfo(constantPool);
            case ConstantInfo.CONSTANT_NameAndType:
                return new ConstantNameAndTypeInfo();
            case ConstantInfo.CONSTANT_MethodHandler:
                return new ConstantMethodHandleInfo();
            case ConstantInfo.CONSTANT_MethodType:
                return new ConstantMethodTypeInfo();
            case ConstantInfo.CONSTANT_InvokeDynamic:
                return new ConstantInvokeDynamicInfo();
            default:
                throw new Error("java.lang.ClassFormatError: constant pool tag!");
        }
    }
}

module.exports = ConstantInfo;