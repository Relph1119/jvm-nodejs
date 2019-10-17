/**
 * @author: HuRuiFeng
 * @file: Thread.class.js
 * @time: 2019/10/17
 * @desc: 线程
 */

let Stack = require("./Stack.class").Stack;

class Thread {
    constructor() {
        this.pc = 0;
        this.stack = new Stack(1024);
    }

    push_frame(frame) {
        this.stack.push(frame);
    }

    pop_frame() {
        return this.stack.pop();
    }

    current_frame() {
        return this.stack.pop()
    }
}

exports.Thread = Thread;