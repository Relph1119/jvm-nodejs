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
        _add(frame);
    }
}

// float add
class FADD extends NoOperandsInstruction {
    execute(frame) {
        _add(frame);
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