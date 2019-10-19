/**
 * @author: HuRuiFeng
 * @file: Ifacmp.class.js
 * @time: 2019/10/17 19:32
 * @desc: if_acmp<cond>指令把栈顶的两个引用弹出，根据引用是否相同进行跳转
 */

const branch = require("../base/BranchLogic").branch;
const BranchInstruction = require("../base/Instruction.class").BranchInstruction;

function _acmpPop(frame) {
    let stack = frame.operand_stack;
    let val2 = stack.pop_ref();
    let val1 = stack.pop_ref();
    return {val1: val1, val2: val2};
}

class IF_ACMPEQ extends BranchInstruction {
    execute(frame) {
        let result = _acmpPop(frame);
        if (result.val1 === result.val2) {
            branch(frame, this.offset);
        }
    }
}

class IF_ACMPNE extends BranchInstruction {
    execute(frame) {
        let result = _acmpPop(frame);
        if (result.val1 !== result.val2) {
            branch(frame, this.offset);
        }
    }
}

module.exports = {
    IF_ACMPEQ: IF_ACMPEQ,
    IF_ACMPNE: IF_ACMPNE
};