/**
 * @author: HuRuiFeng
 * @file: L2x.class.js
 * @time: 2019/10/17 16:52
 * @desc: long类型转换指令
 */

const NoOperandsInstruction = require("../base/Instruction.class").NoOperandsInstruction;

// Convert long to double
class L2D extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let l = stack.pop_numeric();
        let f = parseFloat(l);
        stack.push_numeric(f)
    }
}

// Convert long to float
class L2F extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let l = stack.pop_numeric();
        let f = parseFloat(l);
        stack.push_numeric(f)
    }
}

// Convert long to int
class L2I extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let l = stack.pop_numeric();
        let i = parseInt(l);
        stack.push_numeric(i)
    }
}


module.exports = {
    L2D: L2D,
    L2F: L2F,
    L2I: L2I
};