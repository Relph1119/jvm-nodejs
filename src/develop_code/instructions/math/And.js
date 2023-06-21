/**
 * @author: HuRuiFeng
 * @file: And.js
 * @time: 2019/10/17
 * @desc: 按位与(and)指令
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;

function _and(frame) {
    let stack = frame.operand_stack;
    let v2 = stack.pop_numeric();
    let v1 = stack.pop_numeric();
    let result = v1 & v2;
    stack.push_numeric(result);
}

// int and
class IAND extends NoOperandsInstruction {
    execute(frame) {
        _and(frame);
    }
}

class LAND extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_numeric();
        let v1 = stack.pop_numeric();
        let result = BigInt(v1) & BigInt(v2);
        stack.push_numeric(result);
    }
}

module.exports = {
    IAND: IAND,
    LAND: LAND
};
