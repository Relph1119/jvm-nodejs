/**
 * @author: HuRuiFeng
 * @file: Swap.js
 * @time: 2019/10/17
 * @desc: swap指令
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;

class SWAP extends NoOperandsInstruction {
    /*
    bottom -> top
    [...][c][b][a]
              \/
              /\
             V  V
    [...][c][a][b]
     */

    execute(frame) {
        let stack = frame.operand_stack;
        let slot1 = stack.pop_slot();
        let slot2 = stack.pop_slot();
        stack.push_slot(slot1);
        stack.push_slot(slot2);
    }
}

exports.SWAP = SWAP;
