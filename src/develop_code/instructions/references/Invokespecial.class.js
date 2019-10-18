/**
 * @author: HuRuiFeng
 * @file: Invokespecial.class.js
 * @time: 2019/10/18 19:57
 * @desc: invokespecial指令用于调用构造函数初始化对象
 */

const Index16Instruction = require("../base/Instruction.class").Index16Instruction;

class INVOKE_SPECIAL extends Index16Instruction {
    execute(frame) {
        frame.operand_stack.pop_ref()
    }
}

exports.INVOKE_SPECIAL = INVOKE_SPECIAL;