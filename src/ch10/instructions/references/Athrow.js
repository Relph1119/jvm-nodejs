/**
 * @author: HuRuiFeng
 * @file: Athrow.js
 * @time: 2023/6/26 23:08
 * @project: jvm-nodejs
 * @desc: athrow指令，操作数是一个异常对象引用，从操作数栈弹出。
 */

const StringPool = require("../../rtda/heap/StringPool");
const {NoOperandsInstruction} = require("../base/Instruction");

class ATHROW extends NoOperandsInstruction {
    execute(frame) {
        // 先从操作数栈中弹出异常对象引用
        let ex = frame.operand_stack.pop_ref();
        // 如果该引用是null，则抛出NullPointerException异常
        if (ex == null) {
            throw new Error("java.lang.NullPointerException")
        }
        // 否则，是否可以找到并跳转到异常处理代码
        let thread = frame.thread;
        if (!find_and_goto_exception_handler(thread, ex)) {
            // 遍历完Java虚拟机栈还是找不到异常处理代码，则打印出Java虚拟机栈信息
            handle_uncaught_exception(thread, ex)
        }
    }
}

/**
 * 从当前帧开始，遍历Java虚拟机栈，查找方法的异常处理表。
 * 假设遍历到帧F，如果在F对应的方法中找不到异常处理项，则把F弹出，继续遍历。
 * 如果找到了异常处理项，在跳转到异常处理代码之前，要先把F的操作数栈清空，然后把异常对象引用推入栈顶。
 * @returns {boolean}
 */
function find_and_goto_exception_handler(thread, ex) {
    while (true) {
        let frame = thread.current_frame();
        let pc = frame.next_pc - 1;
        let handler_pc = frame.method.find_exception_handler(ex.get_class(), pc);
        if (handler_pc > 0) {
            let stack = frame.operand_stack;
            stack.clear();
            stack.push_ref(ex);
            frame.next_pc = handler_pc;
            return true;
        }
        thread.pop_frame();
        // 由于Java虚拟机栈已经空了，所以解释器也就终止执行了。
        if (thread.is_stack_empty()) {
            break;
        }
    }
    return false;
}

// 打印Java虚拟机栈信息
function handle_uncaught_exception(thread, ex) {
    // 把Java虚拟机栈清空，然后打印出异常信息
    thread.clear_stack();
    let j_msg = ex.get_ref_var("detailMessage", "Ljava/lang/String;")
    let nodejs_msg = StringPool.nodejs_string(j_msg)
    console.log(ex.get_class().java_name(), ":", nodejs_msg)

    // 打印异常信息
    for (let ste of ex.extra) {
        console.log("\tat ", ste.toString());
    }
}

module.exports = {
    ATHROW: ATHROW
}
