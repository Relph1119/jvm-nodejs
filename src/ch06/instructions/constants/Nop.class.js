/**
 * @author: HuRuiFeng
 * @file: Nop.class.js
 * @time: 2019/10/17
 * @desc: nop指令，它什么也不做
 */

const NoOperandsInstruction = require("../base/Instruction.class").NoOperandsInstruction;

class NOP extends NoOperandsInstruction {
    execute(frame) {
    }
}

exports.NOP = NOP;