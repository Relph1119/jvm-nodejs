/**
 * @author: HuRuiFeng
 * @file: Checkcast.class.js
 * @time: 2019/10/18 18:58
 * @desc: checkcast指令和instanceof指令很像，区别在于：instanceof指令会改变操作数栈（弹出对象引用，推入判断结果）；
 checkcast指令则不会改变操作数栈（如果判断失败，直接抛出ClassCastException异常）
 */

const Index16Instruction = require("../base/Instruction.class").Index16Instruction;

class CHECK_CAST extends Index16Instruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let ref = stack.pop_ref();
        stack.push_ref(ref);
        if (ref === null) {
            return;
        }

        let cp = frame.method.get_class().constant_pool;
        let class_ref = cp.get_constant(this.index);
        let clazz = class_ref.resolved_class();
        if (!ref.is_instance_of(clazz)) {
            throw new Error("java.lang.ClassCastException");
        }
    }

}

exports.CHECK_CAST = CHECK_CAST;