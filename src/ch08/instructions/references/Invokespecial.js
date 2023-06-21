/**
 * @author: HuRuiFeng
 * @file: Invokespecial.js
 * @time: 2019/10/18 19:57
 * @desc: invokespecial指令用于调用构造函数初始化对象
 */

const MethodLookup = require("../../rtda/heap/MethodLookup");
const MethodInvokeLogic = require("../base/MethodInvokeLogic");
const Index16Instruction = require("../base/Instruction").Index16Instruction;

class INVOKE_SPECIAL extends Index16Instruction {
    execute(frame) {
        // 获得当前类、当前常量池、方法符号引用
        let current_class = frame.method.get_class();
        let cp = current_class.constant_pool;
        let method_ref = cp.get_constant(this.index);
        // 解析符号引用，得到解析后的类和方法
        let resolved_class = method_ref.resolved_class();
        let resolved_method = method_ref.resolved_method();

        /*
         * 假设从方法符号引用中解析出来的类是C，方法是M。
         * 如果M是构造函数，则声明M的类必须是C，否则抛出NoSuchMethodError异常。
         * 如果M是静态方法，则抛出IncompatibleClassChangeError异常。
        */
        if (resolved_method.name === "<init>" && resolved_method.get_class() !== resolved_class) {
            throw new Error("java.lang.NoSuchMethodError")
        }
        if (resolved_method.is_static()) {
            throw new Error("java.lang.IncompatibleClassChangeError")
        }

        // 从操作数栈中弹出this引用，如果该引用是null，抛出NullPointerException异常。
        let ref = frame.operand_stack.get_ref_from_top(resolved_method.arg_slot_count - 1);
        if (ref === null) {
            throw new Error("java.lang.NullPointerException")
        }

        // 确保protected方法只能被声明该方法的类或子类调用，如果违反这一规定，则抛出IllegalAccessError异常。
        if (resolved_method.is_protected() && resolved_method.get_class().is_super_class_of(current_class)
            && resolved_method.get_class().get_package_name() !== current_class.get_package_name()
            && ref.get_class() !== current_class
            && !ref.get_class().is_sub_class_of(current_class)) {
            throw new Error("java.lang.IllegalAccessError")
        }

        /*
        * 如果调用超类中函数，但不是构造函数，且当前类的ACC_SUPER标志被设置，需要一个额外的过程查找最终要调用的方法，
        * 否则签名从方法符号引用中解析出来的方法就是要调用的方法。
        */
        let method_to_be_invoked = resolved_method;
        if (current_class.is_super() && resolved_class.is_super_class_of(current_class)
            && resolved_method.name !== "<init>") {
            method_to_be_invoked = MethodLookup.lookup_method_in_class(
                current_class.super_class, method_ref.name, method_ref.descriptor)
        }

        // 如果查找过程失败，或者找到的方法是抽象的，抛出abstractMethodError异常。
        if (method_to_be_invoked == null || method_to_be_invoked.is_abstract()) {
            throw new Error("java.lang.AbstractMethodError")
        }

        MethodInvokeLogic.invoke_method(frame, method_to_be_invoked)
    }
}

exports.INVOKE_SPECIAL = INVOKE_SPECIAL;
