/**
 * @author: HuRuiFeng
 * @file: Neg.js
 * @time: 2019/10/17
 * @desc: 取反(neg)指令
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;

function _neg(frame) {
    let stack = frame.operand_stack;
    let val = stack.pop_numeric();
    stack.push_numeric(-val);
}

// double negate
class DNEG extends NoOperandsInstruction {
    execute(frame) {
        _neg(frame);
    }
}

// float negate
class FNEG extends NoOperandsInstruction {
    execute(frame) {
        _neg(frame);
    }
}

// int negate
class INEG extends NoOperandsInstruction {
    execute(frame) {
        _neg(frame);
    }
}

// long negate
class LNEG extends NoOperandsInstruction {
    execute(frame) {
        _neg(frame);
    }
}

module.exports = {
    DNEG: DNEG,
    FNEG: FNEG,
    INEG: INEG,
    LNEG: LNEG
};
