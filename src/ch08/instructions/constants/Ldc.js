/**
 * @author: HuRuiFeng
 * @file: Ldc.js
 * @time: 2019/10/18 19:35
 * @desc: ldc系列指令从运行时常量池中加载常量值，并把它推入操作数栈。
 ldc和ldc_w指令用于加载int、float和字符串常量，java.lang.Class实例或者MethodType和MethodHandle实例。
 ldc2_w指令用于加载long和double常量。
 */

const j_string = require("../../rtda/heap/StringPool").j_string;
const Index16Instruction = require("../base/Instruction").Index16Instruction;
const Index8Instruction = require("../base/Instruction").Index8Instruction;

function _ldc(frame, index) {
    let stack = frame.operand_stack;
    let clazz = frame.method.get_class();
    let c = clazz.constant_pool.get_constant(index);

    switch (c.constructor) {
        case Number:
            stack.push_numeric(c);
            break;
        case BigInt:
            if (c <= Number.MAX_SAFE_INTEGER) {
                stack.push_numeric(Number(c));
            }
            break;
        case String:
            // 从运行时常量池中加载字符串常量，先通过常量拿到python字符串，然后把它转成Java字符串实例
            let interned_str = j_string(clazz.loader, c);
            // 把引用推入操作数栈顶
            stack.push_ref(interned_str);
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
