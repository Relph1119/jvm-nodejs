/**
 * @author: HuRuiFeng
 * @file: Ifcond.js
 * @time: 2019/10/17 19:44
 * @desc: if<cond>指令把操作数栈顶的int变量弹出，然后跟0进行比较，满足条件则跳转
 */

const branch = require("../base/BranchLogic").branch;
const BranchInstruction = require("../base/Instruction").BranchInstruction;

// ifeq: x == 0
class IFEQ extends BranchInstruction {
    execute(frame) {
        let val = frame.operand_stack.pop_int();
        if (val === 0) {
            branch(frame, this.offset);
        }
    }
}

// ifne: x != 0
class IFNE extends BranchInstruction {
    execute(frame) {
        let val = frame.operand_stack.pop_int();
        if (val !== 0) {
            branch(frame, this.offset);
        }
    }
}

// iflt: x < 0
class IFLT extends BranchInstruction {
    execute(frame) {
        let val = frame.operand_stack.pop_int();
        if (val < 0) {
            branch(frame, this.offset);
        }
    }
}

// ifle: x <= 0
class IFLE extends BranchInstruction {
    execute(frame) {
        let val = frame.operand_stack.pop_int();
        if (val <= 0) {
            branch(frame, this.offset);
        }
    }
}

// ifgt: x > 0
class IFGT extends BranchInstruction {
    execute(frame) {
        let val = frame.operand_stack.pop_int();
        if (val > 0) {
            branch(frame, this.offset);
        }
    }
}

// ifge: x >= 0
class IFGE extends BranchInstruction {
    execute(frame) {
        let val = frame.operand_stack.pop_int();
        if (val >= 0) {
            branch(frame, this.offset);
        }
    }
}

module.exports = {
    IFEQ: IFEQ,
    IFNE: IFNE,
    IFLT: IFLT,
    IFLE: IFLE,
    IFGT: IFGT,
    IFGE: IFGE
};
