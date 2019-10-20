/**
 * @author: HuRuiFeng
 * @file: Add.class.js
 * @time: 2019/10/17
 * @desc: 加法(add)指令
 */
const NoOperandsInstruction = require("../base/Instruction.class").NoOperandsInstruction;

function _add(frame) {
    let stack = frame.operand_stack;
    let v1 = stack.pop_numeric();
    let v2 = stack.pop_numeric();
    let result = v1 + v2;
    stack.push_numeric(result);
}

// double add
class DADD extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v1 = stack.pop_double();
        let v2 = stack.pop_double();
        let result = v1 + v2;
        stack.push_double(result);
    }
}

// float add
class FADD extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v1 = stack.pop_float();
        let v2 = stack.pop_float();
        let result = v1 + v2;
        stack.push_float(result);
    }
}

// int add
class IADD extends NoOperandsInstruction {
    execute(frame) {
        _add(frame);
    }
}

// long add
class LADD extends NoOperandsInstruction {
    execute(frame) {
        _add(frame);
    }
}

module.exports = {
    DADD: DADD,
    FADD: FADD,
    IADD: IADD,
    LADD: LADD
};