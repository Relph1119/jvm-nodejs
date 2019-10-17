/**
 * @author: HuRuiFeng
 * @file: POP.class.js
 * @time: 2019/10/17
 * @desc: pop系列指令
 */

const NoOperandsInstruction = require("../base/Instruction.class").NoOperandsInstruction;

class POP extends NoOperandsInstruction {
    /*
    bottom -> top
    [...][c][b][a]
                |
                V
    [...][c][b]
     */

    execute(frame) {
        let stack = frame.operand_stack;
        stack.pop_slot();
    }
}

// 由于实现中采用的是node.js的无类型数，不管是double还是int都占用一个操作数栈位置
class POP2 extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        stack.pop_slot();
    }
}

module.exports = {
    POP: POP,
    POP2: POP2
};