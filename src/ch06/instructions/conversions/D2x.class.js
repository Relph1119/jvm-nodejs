/**
 * @author: HuRuiFeng
 * @file: D2x.class.js
 * @time: 2019/10/17 16:52
 * @desc: double类型转换指令
 */

const NoOperandsInstruction = require("../base/Instruction.class").NoOperandsInstruction;

// Convert double to float
class D2F extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let d = stack.pop_numeric();
        let f = parseFloat(d);
        stack.push_numeric(f)
    }
}

// Convert double to int
class D2I extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let d = stack.pop_numeric();
        let i = parseInt(d);
        stack.push_numeric(i)
    }
}

// Convert double to long
class D2L extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let d = stack.pop_numeric();
        let l = parseInt(d);
        stack.push_numeric(l)
    }
}


module.exports = {
    D2F: D2F,
    D2I: D2I,
    D2L: D2L
};