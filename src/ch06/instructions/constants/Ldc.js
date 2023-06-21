/**
 * @author: HuRuiFeng
 * @file: Ldc.js
 * @time: 2019/10/18 19:35
 * @desc: ldc系列指令从运行时常量池中加载常量值，并把它推入操作数栈。
 ldc和ldc_w指令用于加载int、float和字符串常量，java.lang.Class实例或者MethodType和MethodHandle实例。
 ldc2_w指令用于加载long和double常量。
 */

const Index16Instruction = require("../base/Instruction").Index16Instruction;
const Index8Instruction = require("../base/Instruction").Index8Instruction;

function _ldc(frame, index) {
    let stack = frame.operand_stack;
    let cp = frame.method.get_class().constant_pool;
    let c = cp.get_constant(index);

    if (c.constructor === Number) {
        stack.push_numeric(c);
    } else {
        throw new Error("todo: ldc!")
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
