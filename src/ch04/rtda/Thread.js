/**
 * @author: HuRuiFeng
 * @file: Thread.js
 * @time: 2019/10/17
 * @desc: 线程
 */

const Stack = require("./Stack").Stack;

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
        return this.stack.top();
    }
}

exports.Thread = Thread;
