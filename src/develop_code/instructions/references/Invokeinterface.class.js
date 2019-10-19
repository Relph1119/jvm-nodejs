/**
 * @author: HuRuiFeng
 * @file: Invokeinterface.class.js
 * @time: 2019/10/19 13:14
 * @desc: 接口调用指令
 */

const MethodLookup = require("../../rtda/heap/MethodLookup.class");
const MethodInvokeLogic = require("../base/MethodInvokeLogic.class");
const Instruction = require("../base/Instruction.class").Instruction;

class INVOKE_INTERFACE extends Instruction {
    constructor() {
        super();
        this.index = 0;
    }

    fetch_operands(reader) {
        this.index = reader.read_uint16();
        reader.read_uint8();
        reader.read_uint8();
    }

    execute(frame) {
        // 从运行时常量池中获得并解析接口方法符号引用
        let cp = frame.method.get_class().constant_pool;
        let method_ref = cp.get_constant(this.index);
        let resolve_method = method_ref.resolved_interface_method();
        // 如果解析后的方法是静态方法或私有方法，则抛出IncompatibleClassChangeError异常
        if (resolve_method.is_static() || resolve_method.is_private()) {
            throw new Error("java.lang.IncompatibleClassChangeError")
        }
        /*
        * 从操作数中弹出this引用，如果引用是null，则抛出NullPointerException异常。
        * 如果引用所指对象的类没有实现解析出来的接口，则抛出IncompatibleClassChangeError异常。
        */
        let ref = frame.operand_stack.get_ref_from_top(resolve_method.arg_slot_count - 1);
        if (ref === null) {
            throw new Error("java.lang.NullPointerException")
        }

        if (!ref.get_class().is_implements(method_ref.resolved_class())) {
            throw new Error("java.lang.IncompatibleClassChangeError")
        }

        /*
        * 查找最终要调用的方法，如果找不到，或者找到的方法是抽象的，则抛出abstractMethodError异常。
        * 如果找到的方法不是public，则抛出IllegalAccessError异常。
        * */
        let method_to_be_invoked = MethodLookup.lookup_method_in_class(
            ref.get_class(), method_ref.name, method_ref.descriptor);
        if (!method_to_be_invoked || method_to_be_invoked.is_abstract()) {
            throw new Error("java.lang.abstractMethodError");
        }

        if (!method_to_be_invoked.is_public()) {
            throw new Error("java.lang.IllegalAccessError")
        }
        MethodInvokeLogic.invoke_method(frame, method_to_be_invoked)
    }
}

exports.INVOKE_INTERFACE = INVOKE_INTERFACE;