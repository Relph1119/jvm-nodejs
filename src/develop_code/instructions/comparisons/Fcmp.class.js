/**
 * @author: HuRuiFeng
 * @file: Fcmp.class.js
 * @time: 2019/10/17 19:30
 * @desc: 比较float变量指令，当两个float变量中至少有一个是NaN时，用fcmpg指令比较的结果是1，用fcmpl指令比较的结果是-1
 */

const NoOperandsInstruction = require("../base/Instruction.class").NoOperandsInstruction;

function _fcmp(frame, gFlag) {
    let stack = frame.operand_stack;
    let v2 = stack.pop_float();
    let v1 = stack.pop_float();
    if (v1 > v2) {
        stack.push_numeric(1);
    } else if (v1 === v2) {
        stack.push_numeric(0);
    } else if (v1 < v2) {
        stack.push_numeric(-1);
    } else if (gFlag) {
        stack.push_numeric(1);
    } else {
        stack.push_numeric(-1);
    }
}

class FCMPG extends NoOperandsInstruction {
    execute(frame) {
        _fcmp(frame, true);
    }
}

class FCMPL extends NoOperandsInstruction {
    execute(frame) {
        _fcmp(frame, false);
    }
}

module.exports = {
    FCMPG: FCMPG,
    FCMPL: FCMPL
};