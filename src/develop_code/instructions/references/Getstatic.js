/**
 * @author: HuRuiFeng
 * @file: Getstatic.js
 * @time: 2019/10/18 19:09
 * @desc: getstatic指令和putstatic指令正好相反，它取出类的某个静态变量值，然后推入栈顶。
 */

const ClassInitLogic = require("../base/ClassInitLogic");
const Index16Instruction = require("../base/Instruction").Index16Instruction;

class GET_STATIC extends Index16Instruction {
    execute(frame) {
        let cp = frame.method.get_class().constant_pool;
        let field_ref = cp.get_constant(this.index);
        let field = field_ref.resolve_field();
        let clazz = field.get_class();

        if (!clazz.init_started) {
            frame.revert_next_pc();
            ClassInitLogic.init_class(frame.thread, clazz);
            return
        }

        // 如果解析后的字段不是静态字段，抛出IncompatibleClassChangeError异常
        if (!field.is_static()) {
            throw new Error("java.lang.IncompatibleClassChangeError")
        }

        let descriptor = field.descriptor;
        let slot_id = field.slot_id;
        let slots = clazz.static_vars;
        let stack = frame.operand_stack;

        switch (descriptor[0]) {
            case "Z":
            case "B":
            case "C":
            case "S":
            case "I": {
                stack.push_int(slots.get_int(slot_id));
                break;
            }
            case "F": {
                stack.push_float(slots.get_float(slot_id));
                break;
            }
            case "D": {
                stack.push_double(slots.get_double(slot_id));
                break;
            }
            case "L":
            case "[": {
                stack.push_ref(slots.get_ref(slot_id));
                break;
            }
            default: {
                // todo
            }
        }
    }
}

exports.GET_STATIC = GET_STATIC;
