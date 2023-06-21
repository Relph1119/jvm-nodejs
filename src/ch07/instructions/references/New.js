/**
 * @author: HuRuiFeng
 * @file: New.js
 * @time: 2019/10/18 19:03
 * @desc: new指令
 */

const ClassInitLogic = require("../base/ClassInitLogic");
const Index16Instruction = require("../base/Instruction").Index16Instruction;

class NEW extends Index16Instruction {
    /**
     * 从当前类的运行时常量池中找到一个类符号索引，解析这个类符号引用，拿到类数据，然后创建对象，并把对象引用推入栈顶。
     * @param frame
     */
    execute(frame) {
        let cp = frame.method.get_class().constant_pool;
        let class_ref = cp.get_constant(this.index);
        let clazz = class_ref.resolved_class();

        if (!clazz.init_started) {
            frame.revert_next_pc();
            ClassInitLogic.init_class(frame.thread, clazz);
            return;
        }

        if (clazz.is_interface() || clazz.is_abstract()) {
            throw new Error("java.lang.InstantiationError")
        }

        let ref = clazz.new_object();
        frame.operand_stack.push_ref(ref);
    }
}

exports.NEW = NEW;
