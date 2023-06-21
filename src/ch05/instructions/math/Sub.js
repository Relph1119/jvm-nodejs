/**
 * @author: HuRuiFeng
 * @file: Sub.js
 * @time: 2019/10/17 16:45
 * @desc: 减法(sub)指令
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;

function _sub(frame) {
    let stack = frame.operand_stack;
    let v2 = stack.pop_numeric();
    let v1 = stack.pop_numeric();
    let result = v1 - v2;
    stack.push_numeric(result);
}

// double sub
class DSUB extends NoOperandsInstruction {
    execute(frame) {
        _sub(frame);
    }
}

// float sub
class FSUB extends NoOperandsInstruction {
    execute(frame) {
        _sub(frame);
    }
}

// int sub
class ISUB extends NoOperandsInstruction {
    execute(frame) {
        _sub(frame);
    }
}

// long sub
class LSUB extends NoOperandsInstruction {
    execute(frame) {
        _sub(frame);
    }
}

module.exports = {
    DSUB: DSUB,
    FSUB: FSUB,
    ISUB: ISUB,
    LSUB: LSUB
};
