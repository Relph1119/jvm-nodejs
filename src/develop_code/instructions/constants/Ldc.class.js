/**
 * @author: HuRuiFeng
 * @file: Ldc.class.js
 * @time: 2019/10/18 19:35
 * @desc: ldc系列指令从运行时常量池中加载常量值，并把它推入操作数栈。
 ldc和ldc_w指令用于加载int、float和字符串常量，java.lang.Class实例或者MethodType和MethodHandle实例。
 ldc2_w指令用于加载long和double常量。
 */

const ClassRef = require("../../rtda/heap/CpClassRef.class").ClassRef;
const j_string = require("../../rtda/heap/StringPool.class").j_string;
const Index16Instruction = require("../base/Instruction.class").Index16Instruction;
const Index8Instruction = require("../base/Instruction.class").Index8Instruction;

function _ldc(frame, index) {
    let stack = frame.operand_stack;
    let clazz = frame.method.get_class();
    let c = clazz.constant_pool.get_constant(index);

    switch (c.constructor) {
        case Number:
            if (c % 1 !== 0) {
                stack.push_float(c);
            } else {
                stack.push_numeric(c);
            }
            break;
        case BigInt:
            stack.push_numeric(c);
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
        let stack = frame.operand_stack;
        let cp = frame.method.get_class().constant_pool;
        let c = cp.get_constant(this.index);

        if (c.constructor === Number) {
            if (c % 1 !== 0) {
                stack.push_double(c);
            } else {
                stack.push_numeric(c);
            }
        } else {
            throw new Error("java.lang.ClassFormatError")
        }
    }
}

module.exports = {
    LDC: LDC,
    LDC_W: LDC_W,
    LDC2_W: LDC2_W
};