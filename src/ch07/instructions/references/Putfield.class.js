/**
 * @author: HuRuiFeng
 * @file: Putfield.class.js
 * @time: 2019/10/18 19:24
 * @desc: putfield指令给实例变量赋值，它需要三个操作数。前两个操作数是常量池索引和变量值，用法和putstatic一样。
 第三个操作数是对象引用，从操作数栈中弹出。
 */

const Index16Instruction = require("../base/Instruction.class").Index16Instruction;

class PUT_FIELD extends Index16Instruction {
    execute(frame) {
        let current_method = frame.method;
        let current_class = current_method.get_class();
        let cp = current_class.constant_pool;
        let field_ref = cp.get_constant(this.index);
        let field = field_ref.resolve_field();

        // 解析后的字段必须是实例字段，否则抛出IncompatibleClassChangeError异常。
        if (field.is_static()) {
            throw new Error("java.lang.IncompatibleClassChangeError")
        }
        // 如果是final字段，则只能在构造函数中初始化，否则抛出IllegalAccessError异常。
        if (field.is_final()) {
            if (current_class !== field.get_class() || current_method.name !== "<init>") {
                throw new Error("java.lang.IllegalAccessError")
            }
        }

        let descriptor = field.descriptor;
        let slot_id = field.slot_id;
        let stack = frame.operand_stack;

        if (["Z", "B", "C", "S", "I", "F", "J", "D"].includes(descriptor[0])) {
            let val = stack.pop_numeric();
            let ref = stack.pop_ref();
            if (ref === null) {
                throw new Error("java.lang.NollPointerException")
            }
            ref.fields.set_numeric(slot_id, val);
        } else if (["L", "["].includes(descriptor[0])) {
            let val = stack.pop_ref();
            let ref = stack.pop_ref();
            if (ref === null) {
                throw new Error("java.lang.NollPointerException")
            }
            ref.fields.set_ref(slot_id, val);
        }
    }
}

exports.PUT_FIELD = PUT_FIELD;