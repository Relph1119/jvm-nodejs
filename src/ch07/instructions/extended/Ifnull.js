/**
 * @author: HuRuiFeng
 * @file: Ifnull.js
 * @time: 2019/10/17 20:19
 * @desc: 根据引用是否为null进行跳转
 */

const branch = require("../base/BranchLogic").branch;
const BranchInstruction = require("../base/Instruction").BranchInstruction;

class IFNULL extends BranchInstruction {
    execute(frame) {
        let ref = frame.operand_stack.pop_ref();
        if (ref == null) {
            branch(frame, this.offset)
        }
    }
}

class IFNONNULL extends BranchInstruction {
    execute(frame) {
        let ref = frame.operand_stack.pop_ref();
        if (ref != null) {
            branch(frame, this.offset)
        }
    }
}

module.exports = {
    IFNULL: IFNULL,
    IFNONNULL: IFNONNULL
};
