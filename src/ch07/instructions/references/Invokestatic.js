/**
 * @author: HuRuiFeng
 * @file: Invokestatic.js
 * @time: 2019/10/19 12:46
 * @desc: 调用静态方法指令
 */

const ClassInitLogic = require("../base/ClassInitLogic");
const MethodInvokeLogic = require("../base/MethodInvokeLogic");
const Index16Instruction = require("../base/Instruction").Index16Instruction;

class INVOKE_STATIC extends Index16Instruction {
    execute(frame) {
        let cp = frame.method.get_class().constant_pool;
        let method_ref = cp.get_constant(this.index);
        let resolved_method = method_ref.resolved_method();
        if (!resolved_method.is_static()) {
            throw new Error("java.lang.IncompatibleClassChangeError")
        }

        let clazz = resolved_method.get_class();
        if (!clazz.init_started) {
            frame.revert_next_pc();
            ClassInitLogic.init_class(frame.thread, clazz);
            return;
        }
        MethodInvokeLogic.invoke_method(frame, resolved_method);
    }
}

exports.INVOKE_STATIC = INVOKE_STATIC;
