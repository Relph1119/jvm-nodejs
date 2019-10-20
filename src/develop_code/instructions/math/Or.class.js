/**
 * @author: HuRuiFeng
 * @file: Or.class.js
 * @time: 2019/10/17
 * @desc: 按位或(or)指令
 */

const NoOperandsInstruction = require("../base/Instruction.class").NoOperandsInstruction;

// int or
class IOR extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_numeric();
        let v1 = stack.pop_numeric();
        let result = v1 | v2;
        stack.push_numeric(result);
    }
}

// long or
class LOR extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_numeric();
        let v1 = stack.pop_numeric();
        let result = BigInt(v1) | BigInt(v2);
        stack.push_numeric(result);
    }
}

module.exports = {
    IOR: IOR,
    LOR: LOR
};