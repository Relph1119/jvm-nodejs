/**
 * @author: HuRuiFeng
 * @file: Frame.js
 * @time: 2019/10/17
 * @desc: 帧
 */

let LocalVars = require("./LocalVars").LocalVars;
let OperandStack = require("./OperandStack").OperandStack;

class Frame {
    constructor(max_locals, max_stack) {
        // 用来实现链表数据结构
        this.lower = null;
        // 保存局部变量表指针
        this.local_vars = new LocalVars(max_locals);
        // 保存操作数栈指针
        this.operand_stack = new OperandStack(max_stack);
    }

}

exports.Frame = Frame;
