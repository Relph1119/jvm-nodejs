/**
 * @author: HuRuiFeng
 * @file: Method.js
 * @time: 2019/10/18 15:21
 * @desc: 方法信息
 */

const AccessFlags = require("./AccessFlags");
const ClassMember = require("./ClassMember").ClassMember;
const MethodDescriptorParser = require("./MethodDescriptorParser").MethodDescriptorParser;

class Method extends ClassMember {
    constructor() {
        super();
        // 操作数栈
        this.max_stack = 0;
        // 局部变量表大小
        this.max_locals = 0;
        // 存放方法字节码
        this.code = [];
        this.arg_slot_count = 0
    }

    /**
     * 根据class文件中的方法信息创建Method表
     * @param clazz
     * @param cfMethods
     */
    static new_methods(clazz, cfMethods) {
        let methods = [];
        for (let cfMethod of cfMethods) {
            let method = new Method();
            method.set_class(clazz);
            method.copy_member_info(cfMethod);
            method.copy_attributes(cfMethod);
            method.calc_arg_slot_count();
            methods.push(method);
        }

        return methods
    }

    /**
     * 从method_info结构中提取max_stack、max_locals、code信息
     * @param cfMethod
     */
    copy_attributes(cfMethod) {
        let code_attr = cfMethod.code_attribute();
        if (code_attr) {
            this.max_stack = code_attr.max_stack;
            this.max_locals = code_attr.max_locals;
            this.code = code_attr.code;
        }
    }

    /**
     * 计算参数在局部变量表中占用多少位置
     */
    calc_arg_slot_count() {
        let parsed_descriptor = MethodDescriptorParser.parse_method_descriptor(this.descriptor);
        this.arg_slot_count = parsed_descriptor.parameter_types.length;

        if (!this.is_static()) {
            this.arg_slot_count += 1
        }
    }

    is_synchronized() {
        return 0 !== (this.access_flags & AccessFlags.ACC_SYNCHRONIZED);
    }

    is_bridge() {
        return 0 !== (this.access_flags & AccessFlags.ACC_BRIDGE);
    }

    is_varargs() {
        return 0 !== (this.access_flags & AccessFlags.ACC_VARARGS);
    }

    is_native() {
        return 0 !== (this.access_flags & AccessFlags.ACC_NATIVE);
    }

    is_abstract() {
        return 0 !== (this.access_flags & AccessFlags.ACC_ABSTRACT);
    }

    is_strict() {
        return 0 !== (this.access_flags & AccessFlags.ACC_STRICT);
    }

}

exports.Method = Method;
