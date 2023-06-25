/**
 * @author: HuRuiFeng
 * @file: F2x.js
 * @time: 2019/10/17 16:52
 * @desc: float类型转换指令
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;

// Convert float to double
class F2D extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let f = stack.pop_float();
        let d = parseFloat(f);
        stack.push_double(d)
    }
}

// Convert float to int
class F2I extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let f = stack.pop_float();
        let i = parseInt(f);
        stack.push_int(i)
    }
}

// Convert float to long
class F2L extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let f = stack.pop_float();
        let l = parseInt(f);
        stack.push_long(l)
    }
}

module.exports = {
    F2D: F2D,
    F2I: F2I,
    F2L: F2L
};
