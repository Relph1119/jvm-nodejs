/**
 * @author: HuRuiFeng
 * @file: Lcmp.js
 * @time: 2019/10/17 19:57
 * @desc: 比较long变量指令
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;

class LCMP extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_numeric();
        let v1 = stack.pop_numeric();
        if (v1 > v2) {
            stack.push_numeric(1);
        } else if (v1 === v2) {
            stack.push_numeric(0);
        } else {
            stack.push_numeric(-1)
        }
    }
}

exports.LCMP = LCMP;
