/**
 * @author: HuRuiFeng
 * @file: Ldc.js
 * @time: 2019/10/18 19:35
 * @desc: ldc系列指令从运行时常量池中加载常量值，并把它推入操作数栈。
 ldc和ldc_w指令用于加载int、float和字符串常量，java.lang.Class实例或者MethodType和MethodHandle实例。
 ldc2_w指令用于加载long和double常量。
 */

const ClassRef = require("../../rtda/heap/CpClassRef").ClassRef;
const j_string = require("../../rtda/heap/StringPool").j_string;
const Index16Instruction = require("../base/Instruction").Index16Instruction;
const Index8Instruction = require("../base/Instruction").Index8Instruction;
const Int = require('../../rtda/Numeric').Int;
const Long = require('../../rtda/Numeric').Long;
const Float = require('../../rtda/Numeric').Float;
const Double = require('../../rtda/Numeric').Double;

function _ldc(frame, index) {
    let stack = frame.operand_stack;
    let clazz = frame.method.get_class();
    let c = clazz.constant_pool.get_constant(index);

    switch (c.constructor) {
        case Int:
            stack.push_int(c.value());
            break;
        case Float:
            stack.push_float(c.value());
            break;
        case Long:
            stack.push_long(c.value());
            break;
        case Double:
            stack.push_double(c.value());
            break;
        case String:
            // 从运行时常量池中加载字符串常量，先通过常量拿到python字符串，然后把它转成Java字符串实例
            let interned_str = j_string(clazz.loader, c);
            // 把引用推入操作数栈顶
            stack.push_ref(interned_str);
            break;
        case ClassRef:
            let class_obj = c.resolved_class().j_class;
            stack.push_ref(class_obj);
            break;
        default:
            throw new Error("todo: ldc!");
    }
}

class LDC extends Index8Instruction {
    execute(frame) {
        _ldc(frame, this.index);
    }
}

class LDC_W extends Index16Instruction {
    execute(frame) {
        _ldc(frame, this.index);
    }
}

class LDC2_W extends Index16Instruction {
    execute(frame) {
        _ldc(frame, this.index);
    }
}

module.exports = {
    LDC: LDC,
    LDC_W: LDC_W,
    LDC2_W: LDC2_W
};
