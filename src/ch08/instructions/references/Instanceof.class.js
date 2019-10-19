/**
 * @author: HuRuiFeng
 * @file: Instanceof.class.js
 * @time: 2019/10/18 19:30
 * @desc: instanceof指令是判断对象是否是某个类的实例（或者对象的类是否实现了某个接口），并把结果推入操作数栈。
 需要两个操作数，第一个操作数是uint16索引，从方法的字节码中获取，通过这个索引可以从当前类的运行时常量池中找到一个类符号引用。
 第二个操作数是对象引用，从操作数栈中弹出。
 */

const Index16Instruction = require("../base/Instruction.class").Index16Instruction;

class INSTANCE_OF extends Index16Instruction {
    execute(frame) {
        let stack = frame.operand_stack;
        // 弹出对象引用
        let ref = stack.pop_ref();

        // 如果是null，则把0推入操作数栈。
        if (ref === null) {
            stack.push_numeric(0);
            return
        }

        let cp = frame.method.get_class().constant_pool;
        let class_ref = cp.get_constant(this.index);
        let clazz = class_ref.resolved_class();
        if (ref.is_instance_of(clazz)) {
            stack.push_numeric(1);
        } else {
            stack.push_numeric(0);
        }
    }
}

exports.INSTANCE_OF = INSTANCE_OF;