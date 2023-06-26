/**
 * @author: HuRuiFeng
 * @file: Xor.js
 * @time: 2019/10/17 16:48
 * @desc: 按位异或(xor)指令
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;

// int xor
class IXOR extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_int();
        let v1 = stack.pop_int();
        let result = v1 ^ v2;
        stack.push_int(result);
    }
}

// long xor
class LXOR extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_long();
        let v1 = stack.pop_long();
        let result = v1 ^ v2;
        stack.push_long(result);
    }
}

module.exports = {
    IXOR: IXOR,
    LXOR: LXOR
};
