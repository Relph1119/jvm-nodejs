/**
 * @author: HuRuiFeng
 * @file: Invokevirtual.js
 * @time: 2019/10/18 19:58
 * @desc: invokevirtual用于打印计算结果
 */

const Index16Instruction = require("../base/Instruction").Index16Instruction;
const format = require('string-format');
const MethodLookup = require("../../rtda/heap/MethodLookup");
const MethodInvokeLogic = require("../base/MethodInvokeLogic");
format.extend(String.prototype);

class INVOKE_VIRTURL extends Index16Instruction {
    execute(frame) {
        let current_class = frame.method.get_class();
        let cp = current_class.constant_pool;
        let method_ref = cp.get_constant(this.index);
        let resolved_method = method_ref.resolved_method();
        if (resolved_method.is_static()) {
            throw new Error("java.lang.IncompatibleClassChangeError");
        }

        let ref = frame.operand_stack.get_ref_from_top(resolved_method.arg_slot_count - 1);
        if (ref === null) {
            // TODO: hack
            if (method_ref.name === "println") {
                INVOKE_VIRTURL._println(frame.operand_stack, method_ref.descriptor);
                return;
            }
            throw new Error("java.lang.NullPointerException");
        }

        if (resolved_method.is_protected()
            && resolved_method.get_class().is_super_class_of(current_class)
            && resolved_method.get_class().get_package_name() !== current_class.get_package_name()
            && ref.get_class() !== current_class
            && !ref.get_class().is_sub_class_of(current_class)) {
            throw new Error("java.lang.IllegalAccessError");
        }

        // 从对象的类中查找真正要调用的方法。如果找不到方法，或者找到的是抽象方法，则抛出AbstractMethodError异常。
        let method_to_be_invoked = MethodLookup.lookup_method_in_class(
            ref.get_class(), method_ref.name, method_ref.descriptor);
        if (!method_to_be_invoked || method_to_be_invoked.is_abstract()) {
            throw new Error("java.lang.AbstractMethodError");
        }

        MethodInvokeLogic.invoke_method(frame, method_to_be_invoked);
    }

    static _println(stack, descriptor) {
        if (descriptor === "(Z)V") {
            console.log("{0}".format(stack.pop_numeric() !== 0));
        } else if (["(C)V", "(B)V", "(S)V", "(I)V", "(J)V", "(F)V", "(D)V"].includes(descriptor)) {
            console.log("{0}".format(stack.pop_numeric()));
        } else {
            throw new Error("println: " + descriptor);
        }
        stack.pop_ref();
    }
}

exports.INVOKE_VIRTURL = INVOKE_VIRTURL;
