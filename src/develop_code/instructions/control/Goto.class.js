/**
 * @author: HuRuiFeng
 * @file: Goto.class.js
 * @time: 2019/10/17 20:01
 * @desc: goto指令，进行无条件跳转
 */

const branch = require("../base/BranchLogic").branch;
const BranchInstruction = require("../base/Instruction.class").BranchInstruction;

class GOTO extends BranchInstruction {
    execute(frame) {
        branch(frame, this.offset);
    }
}

exports.GOTO = GOTO;