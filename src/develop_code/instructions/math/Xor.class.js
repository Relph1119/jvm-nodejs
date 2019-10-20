/**
 * @author: HuRuiFeng
 * @file: Xor.class.js
 * @time: 2019/10/17 16:48
 * @desc: 按位异或(xor)指令
 */

const NoOperandsInstruction = require("../base/Instruction.class").NoOperandsInstruction;

// int xor
class IXOR extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_numeric();
        let v1 = stack.pop_numeric();
        let result = v1 ^ v2;
        stack.push_numeric(result);
    }
}

// long xor
class LXOR extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_numeric();
        let v1 = stack.pop_numeric();
        let result = BigInt(v1) ^ BigInt(v2);
        stack.push_numeric(result);
    }
}

module.exports = {
    IXOR: IXOR,
    LXOR: LXOR
};