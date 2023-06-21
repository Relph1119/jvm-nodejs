/**
 * @author: HuRuiFeng
 * @file: Getfield.js
 * @time: 2019/10/18 19:21
 * @desc: getfield指令获取对象的实例变量值，然后推入操作数栈，它需要两个操作数。
 第一个是uint16索引，第二个操作数是对象引用。
 */

const Index16Instruction = require("../base/Instruction").Index16Instruction;

class GET_FIELD extends Index16Instruction {
    execute(frame) {
        let cp = frame.method.get_class().constant_pool;
        let field_ref = cp.get_constant(this.index);
        let field = field_ref.resolve_field();

        if (field.is_static()) {
            throw new Error("java.lang.IncompatibleClassChangeError");
        }

        let stack = frame.operand_stack;
        let ref = stack.pop_ref();
        if (ref === null) {
            throw new Error("java.lang.NollPointerException")
        }

        let descriptor = field.descriptor;
        let slot_id = field.slot_id;
        let slots = ref.fields();

        if (["Z", "B", "C", "S", "I", "F", "J", "D"].includes(descriptor[0])) {
            stack.push_numeric(slots.get_numeric(slot_id));
        } else if (["L", "["].includes(descriptor[0])) {
            stack.push_ref(slots.get_ref(slot_id))
        }
    }
}

exports.GET_FIELD = GET_FIELD;
