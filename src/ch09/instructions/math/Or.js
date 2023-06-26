/**
 * @author: HuRuiFeng
 * @file: Or.js
 * @time: 2019/10/17
 * @desc: 按位或(or)指令
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;

// int or
class IOR extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_int();
        let v1 = stack.pop_int();
        let result = v1 | v2;
        stack.push_int(result);
    }
}

// long or
class LOR extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_long();
        let v1 = stack.pop_long();
        let result = BigInt(v1) | BigInt(v2);
        stack.push_long(result);
    }
}

module.exports = {
    IOR: IOR,
    LOR: LOR
};
