/**
 * @author: HuRuiFeng
 * @file: Mul.js
 * @time: 2019/10/17
 * @desc: 乘法(mul)指令
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;

// double mul
class DMUL extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_double();
        let v1 = stack.pop_double();
        let result = v1 * v2;
        stack.push_double(result);
    }
}

// float mul
class FMUL extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_float();
        let v1 = stack.pop_float();
        let result = v1 * v2;
        stack.push_float(result);
    }
}

// int mul
class IMUL extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_int();
        let v1 = stack.pop_int();
        let result = v1 * v2;
        stack.push_int(result);
    }
}

// long mul
class LMUL extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_long();
        let v1 = stack.pop_long();
        let result = v1 * v2;
        stack.push_long(result);
    }
}

module.exports = {
    DMUL: DMUL,
    FMUL: FMUL,
    IMUL: IMUL,
    LMUL: LMUL
};
