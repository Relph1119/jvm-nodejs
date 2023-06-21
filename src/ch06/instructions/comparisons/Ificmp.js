/**
 * @author: HuRuiFeng
 * @file: Ificmp.js
 * @time: 2019/10/17 19:50
 * @desc: if_icmp<cond>指令把栈顶的两个int变量弹出，然后进行比较，满足条件则跳转
 */

const branch = require("../base/BranchLogic").branch;
const BranchInstruction = require("../base/Instruction").BranchInstruction;

function _icmpPop(frame) {
    let stack = frame.operand_stack;
    let val2 = stack.pop_numeric();
    let val1 = stack.pop_numeric();
    return {val1: val1, val2: val2};
}

// if_icmpeq: x1 == x2
class IF_ICMPEQ extends BranchInstruction {
    execute(frame) {
        let result = _icmpPop(frame);
        if (result.val1 === result.val2) {
            branch(frame, this.offset);
        }
    }
}

// if_icmpne: x1 != x2
class IF_ICMPNE extends BranchInstruction {
    execute(frame) {
        let result = _icmpPop(frame);
        if (result.val1 !== result.val2) {
            branch(frame, this.offset);
        }
    }
}

// if_icmplt: x1 < x2
class IF_ICMPLT extends BranchInstruction {
    execute(frame) {
        let result = _icmpPop(frame);
        if (result.val1 < result.val2) {
            branch(frame, this.offset);
        }
    }
}

// if_icmple: x1 <= x2
class IF_ICMPLE extends BranchInstruction {
    execute(frame) {
        let result = _icmpPop(frame);
        if (result.val1 <= result.val2) {
            branch(frame, this.offset);
        }
    }
}

// if_icmpgt: x1 > x2
class IF_ICMPGT extends BranchInstruction {
    execute(frame) {
        let result = _icmpPop(frame);
        if (result.val1 > result.val2) {
            branch(frame, this.offset);
        }
    }
}

// if_icmpge: x1 >= x2
class IF_ICMPGE extends BranchInstruction {
    execute(frame) {
        let result = _icmpPop(frame);
        if (result.val1 >= result.val2) {
            branch(frame, this.offset);
        }
    }
}

module.exports = {
    IF_ICMPEQ: IF_ICMPEQ,
    IF_ICMPNE: IF_ICMPNE,
    IF_ICMPLT: IF_ICMPLT,
    IF_ICMPLE: IF_ICMPLE,
    IF_ICMPGT: IF_ICMPGT,
    IF_ICMPGE: IF_ICMPGE
};
