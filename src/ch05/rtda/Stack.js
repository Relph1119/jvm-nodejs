/**
 * @author: HuRuiFeng
 * @file: Stack.js
 * @time: 2019/10/17
 * @desc: Java虚拟机栈
 */

class Stack {
    constructor(max_size) {
        this.max_size = max_size;
        this.size = 0;
        this.__top = null;
    }

    // 把帧推入栈顶
    push(frame) {
        // 如果栈已经满了，抛出StackOverflowError异常
        if (this.size >= this.max_size) {
            throw new Error("java.lang.StackOverflowError");
        }
        if (this.__top != null) {
            frame.lower = this.__top;
        }
        this.__top = frame;
        this.size++;
    }

    // 把栈顶帧弹出
    pop() {
        if (this.__top == null) {
            throw new Error("jvm stack is empty!");
        }
        let top = this.__top;
        this.__top = top.lower;
        top.lower = null;
        this.size--;
        return top;
    }

    // 返回栈顶帧，但并不弹出
    top() {
        if (this.__top == null) {
            throw new Error("jvm stack is empty!");
        }
        return this.__top
    }

}

exports.Stack = Stack;
