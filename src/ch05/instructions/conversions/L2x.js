/**
 * @author: HuRuiFeng
 * @file: L2x.js
 * @time: 2019/10/17 16:52
 * @desc: long类型转换指令
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;

// Convert long to double
class L2D extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let l = stack.pop_long();
        let f = parseFloat(l);
        stack.push_double(f)
    }
}

// Convert long to float
class L2F extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let l = stack.pop_long();
        let f = parseFloat(l);
        stack.push_float(f)
    }
}

// Convert long to int
class L2I extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let l = stack.pop_long();
        let i = parseInt(l);
        stack.push_int(i)
    }
}


module.exports = {
    L2D: L2D,
    L2F: L2F,
    L2I: L2I
};
