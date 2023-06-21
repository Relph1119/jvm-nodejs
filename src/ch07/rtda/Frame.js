/**
 * @author: HuRuiFeng
 * @file: Frame.js
 * @time: 2019/10/17
 * @desc: 帧
 */

let LocalVars = require("./LocalVars").LocalVars;
let OperandStack = require("./OperandStack").OperandStack;

class Frame {
    constructor(thread, method) {
        // 用来实现链表数据结构
        this.lower = null;
        this.thread = thread;
        this.method = method;
        // 保存局部变量表指针
        this.local_vars = new LocalVars(method.max_locals);
        // 保存操作数栈指针
        this.operand_stack = new OperandStack(method.max_stack);
        this.next_pc = 0;
    }

    revert_next_pc() {
        this.next_pc = this.thread.pc;
    }
}

exports.Frame = Frame;
