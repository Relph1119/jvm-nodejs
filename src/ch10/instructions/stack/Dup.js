/**
 * @author: HuRuiFeng
 * @file: Dup.js
 * @time: 2019/10/17
 * @desc: dup系列指令
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;
const copy_slot = require('../../rtda/Slot').copy_slot;

class DUP extends NoOperandsInstruction {
    /*
    复制栈顶的单个变量
    bottom -> top
    [...][c][b][a]
                 \_
                   |
                   V
    [...][c][b][a][a]
    */

    execute(frame) {
        let stack = frame.operand_stack;
        let slot = stack.pop_slot();
        stack.push_slot(slot);
        // 采用自定义的对象深拷贝，复制slot
        stack.push_slot(copy_slot(slot));
    }
}

class DUP_X1 extends NoOperandsInstruction {
    /*
    bottom -> top
    [...][c][b][a]
              __/
             |
             V
    [...][c][a][b][a]
    */

    execute(frame) {
        let stack = frame.operand_stack;
        let slot1 = stack.pop_slot();
        let slot2 = stack.pop_slot();
        stack.push_slot(copy_slot(slot1));
        stack.push_slot(slot2);
        stack.push_slot(slot1);
    }
}

class DUP_X2 extends NoOperandsInstruction {
    /*
    bottom -> top
    [...][c][b][a]
           _____/
          |
          V
    [...][a][c][b][a]
     */

    execute(frame) {
        let stack = frame.operand_stack;
        let slot1 = stack.pop_slot();
        let slot2 = stack.pop_slot();
        let slot3 = stack.pop_slot();
        stack.push_slot(copy_slot(slot1));
        stack.push_slot(slot3);
        stack.push_slot(slot2);
        stack.push_slot(slot1);
    }
}

class DUP2 extends NoOperandsInstruction {
    /*
    bottom -> top
    [...][c][b][a]____
              \____   |
                   |  |
                   V  V
    [...][c][b][a][b][a]
     */

    execute(frame) {
        let stack = frame.operand_stack;
        let slot1 = stack.pop_slot();
        let slot2 = stack.pop_slot();
        stack.push_slot(slot2);
        stack.push_slot(slot1);
        stack.push_slot(copy_slot(slot2));
        stack.push_slot(copy_slot(slot1));
    }
}

class DUP2_X1 extends NoOperandsInstruction {
    /*
    bottom -> top
    [...][c][b][a]
           _/ __/
          |  |
          V  V
    [...][b][a][c][b][a]
     */

    execute(frame) {
        let stack = frame.operand_stack;
        let slot1 = stack.pop_slot();
        let slot2 = stack.pop_slot();
        let slot3 = stack.pop_slot();
        stack.push_slot(copy_slot(slot2));
        stack.push_slot(copy_slot(slot1));
        stack.push_slot(slot3);
        stack.push_slot(slot2);
        stack.push_slot(slot1);
    }
}

class DUP2_X2 extends NoOperandsInstruction {
    /*
    bottom -> top
    [...][d][c][b][a]
           ____/ __/
          |   __/
          V  V
    [...][b][a][d][c][b][a]
     */

    execute(frame) {
        let stack = frame.operand_stack;
        let slot1 = stack.pop_slot();
        let slot2 = stack.pop_slot();
        let slot3 = stack.pop_slot();
        let slot4 = stack.pop_slot();
        stack.push_slot(copy_slot(slot2));
        stack.push_slot(copy_slot(slot1));
        stack.push_slot(slot4);
        stack.push_slot(slot3);
        stack.push_slot(slot2);
        stack.push_slot(slot1);
    }
}

module.exports = {
    DUP: DUP,
    DUP_X1: DUP_X1,
    DUP_X2: DUP_X2,
    DUP2: DUP2,
    DUP2_X1: DUP2_X1,
    DUP2_X2: DUP2_X2
};
