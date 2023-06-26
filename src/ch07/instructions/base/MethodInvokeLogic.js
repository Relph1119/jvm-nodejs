/**
 * @author: HuRuiFeng
 * @file: MethodInvokeLogic.js
 * @time: 2019/10/19 10:59
 * @desc: 在定位到需要调用的方法之后，Java虚拟机要给这个方法创建一个新的帧并把它推入Java虚拟机栈顶，然后传递参数。
 */

const format = require('string-format');
format.extend(String.prototype);

function invoke_method(invoker_frame, method) {
    // 创建新的帧并推入Java虚拟机栈
    let thread = invoker_frame.thread;
    let new_frame = thread.new_frame(method);
    thread.push_frame(new_frame);

    // 确定方法的参数在局部变量表中占用多少位置
    let arg_slot_slot = method.arg_slot_count;
    if (arg_slot_slot > 0) {
        for (let i = arg_slot_slot - 1; i >= 0; i--) {
            let slot = invoker_frame.operand_stack.pop_slot();
            new_frame.local_vars.set_slot(i, slot);
        }
    }

    // hack! 跳过注册本地方法
    if (method.is_native()) {
        if (method.name === "registerNatives") {
            thread.pop_frame()
        } else {
            throw new Error("native method: {0}.{1}{2}".format(method.get_class().name, method.name, method.descriptor))
        }
    }

}

module.exports = {
    invoke_method: invoke_method
};
