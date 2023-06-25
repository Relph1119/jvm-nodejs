/**
 * @author: HuRuiFeng
 * @file: Frame.js
 * @time: 2019/10/17
 * @desc: 帧
 */

const LocalVars = require("./LocalVars").LocalVars;
const OperandStack = require("./OperandStack").OperandStack;

class Frame {
    constructor(thread, max_locals, max_stack) {
        // 用来实现链表数据结构
        this.lower = null;
        this.thread = thread;
        // 保存局部变量表指针
        this.local_vars = new LocalVars(max_locals);
        // 保存操作数栈指针
        this.operand_stack = new OperandStack(max_stack);
        this.next_pc = 0;
    }

}

exports.Frame = Frame;
