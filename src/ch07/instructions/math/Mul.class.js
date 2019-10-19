/**
 * @author: HuRuiFeng
 * @file: Mul.class.js
 * @time: 2019/10/17
 * @desc: 乘法(mul)指令
 */

const NoOperandsInstruction = require("../base/Instruction.class").NoOperandsInstruction;

function _mul(frame) {
    let stack = frame.operand_stack;
    let v2 = stack.pop_numeric();
    let v1 = stack.pop_numeric();
    let result = v1 * v2;
    stack.push_numeric(result);
}

// double mul
class DMUL extends NoOperandsInstruction {
    execute(frame) {
        _mul(frame);
    }
}

// float mul
class FMUL extends NoOperandsInstruction {
    execute(frame) {
        _mul(frame);
    }
}

// int mul
class IMUL extends NoOperandsInstruction {
    execute(frame) {
        _mul(frame);
    }
}

// long mul
class LMUL extends NoOperandsInstruction {
    execute(frame) {
        _mul(frame);
    }
}

module.exports = {
    DMUL: DMUL,
    FMUL: FMUL,
    IMUL: IMUL,
    LMUL: LMUL
};
