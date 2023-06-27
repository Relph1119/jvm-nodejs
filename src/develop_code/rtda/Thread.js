/**
 * @author: HuRuiFeng
 * @file: Thread.js
 * @time: 2019/10/17
 * @desc: 线程
 */

const Frame = require("./Frame").Frame;
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
        return this.stack.top()
    }

    new_frame(method) {
        return new Frame(this, method);
    }

    top_frame() {
        return this.stack.top();
    }

    is_stack_empty() {
        return this.stack.is_empty()
    }

    clear_stack() {
        this.stack.clear();
    }

    get_frames() {
        return this.stack.get_frames();
    }
}

exports.Thread = Thread;
