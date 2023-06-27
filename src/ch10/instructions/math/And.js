/**
 * @author: HuRuiFeng
 * @file: And.js
 * @time: 2019/10/17
 * @desc: 按位与(and)指令
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;

// int and
class IAND extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_int();
        let v1 = stack.pop_int();
        let result = v1 & v2;
        stack.push_int(result);
    }
}

class LAND extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_long();
        let v1 = stack.pop_long();
        let result = BigInt(v1) & BigInt(v2);
        stack.push_long(result);
    }
}

module.exports = {
    IAND: IAND,
    LAND: LAND
};
