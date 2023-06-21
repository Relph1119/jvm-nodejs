/**
 * @author: HuRuiFeng
 * @file: Putstatic.js
 * @time: 2019/10/18 19:15
 * @desc: putstatic指令：给类的某个静态变量赋值，它需要两个操作数，
 第一个是uint16索引，来自字节码。通过这个索引可以从当前类的运行时常量池中找到一个字段符号引用，
 解析这个符号引用就可以知道要给类的哪个静态变量赋值。
 第二个操作数是要赋值给静态变量的值，从操作数栈中弹出。
 */

const ClassInitLogic = require("../base/ClassInitLogic");
const Index16Instruction = require("../base/Instruction").Index16Instruction;

class PUT_STATIC extends Index16Instruction {
    execute(frame) {
        // 先获得当前方法、当前类和当前常量池
        let current_method = frame.method;
        let current_class = current_method.get_class();
        let cp = current_class.constant_pool;
        // 解析字段符号引用
        let field_ref = cp.get_constant(this.index);
        let field = field_ref.resolve_field();
        let clazz = field.get_class();

        if (!clazz.init_started) {
            frame.revert_next_pc();
            ClassInitLogic.init_class(frame.thread, clazz);
            return;
        }

        // 如果解析后的字段是实例字段而非静态字段，则抛出IncompatibleClassChangeError异常
        if (!field.is_static()) {
            throw new Error("java.lang.IncompatibleClassChangeError");
        }

        // 如果是final字段，则实际操作的是静态变量，只能在类初始化方法中给它赋值，否则抛出IllegalAccessError异常
        // 类初始化方法由编译器生成，名字是<clinit>
        if (field.is_final()) {
            if (current_class !== clazz || current_method.name !== "<clinit>") {
                throw new Error("java.lang.IllegalAccessError")
            }
        }

        let descriptor = field.descriptor;
        let slot_id = field.slot_id;
        let slots = clazz.static_vars;
        let stack = frame.operand_stack;

        if (["Z", "B", "C", "S", "I", "F", "J", "D"].includes(descriptor[0])) {
            slots.set_numeric(slot_id, stack.pop_numeric());
        } else if (["L", "["].includes(descriptor[0])) {
            slots.set_ref(slot_id, stack.pop_ref())
        }
    }
}

exports.PUT_STATIC = PUT_STATIC;
