/**
 * @author: HuRuiFeng
 * @file: Dcmp.class.js
 * @time: 2019/10/17 19:22
 * @desc: 比较double变量指令，当两个double变量中至少有一个是NaN时，用dcmpg指令比较的结果是1，用dcmpl指令比较的结果是-1
 */

const NoOperandsInstruction = require("../base/Instruction.class").NoOperandsInstruction;

function _dcmp(frame, gFlag) {
    let stack = frame.operand_stack;
    let v2 = stack.pop_numeric();
    let v1 = stack.pop_numeric();
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

class DCMPG extends NoOperandsInstruction {
    execute(frame) {
        _dcmp(frame, true);
    }
}

class DCMPL extends NoOperandsInstruction {
    execute(frame) {
        _dcmp(frame, false);
    }
}

module.exports = {
    DCMPG: DCMPG,
    DCMPL: DCMPL
};
