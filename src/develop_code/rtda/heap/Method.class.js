/**
 * @author: HuRuiFeng
 * @file: Method.class.js
 * @time: 2019/10/18 15:21
 * @desc: 方法信息
 */

const AccessFlags = require("./AccessFlags");
const ClassMember = require("./ClassMember.class").ClassMember;
const MethodDescriptorParser = require("./MethodDescriptorParser.class").MethodDescriptorParser;

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
            let method = Method.new_method(clazz, cfMethod);
            methods.push(method);
        }
        return methods
    }

    static new_method(clazz, cfMethod) {
        let method = new Method();
        method.set_class(clazz);
        method.copy_member_info(cfMethod);
        method.copy_attributes(cfMethod);
        let md = MethodDescriptorParser.parse_method_descriptor(method.descriptor);
        // 先计算arg_slot_count字段
        method.calc_arg_slot_count(md.parameter_types);
        // 如果是本地方法，则注入字节码和其他信息。
        if(method.is_native()){
            method.inject_code_attribute(md.return_type);
        }
        return method
    }

    inject_code_attribute(return_type) {
        // 由于本地方法在class文件中没有Code属性，所以需要给max_stack和max_locals赋值。
        this.max_stack = 4;
        this.max_locals = this.arg_slot_count;
        // code字段是本地方法的字节码，第一条指令都是0xfe，第二条指令则根据函数的返回值选择相应的返回指令。
        switch (return_type[0]) {
            case 'V':
                // 对应指令return
                this.code = [0xfe, 0xb1];
                break;
            case 'D':
                // 对应指令dreturn
                this.code = [0xfe, 0xaf];
                break;
            case 'F':
                // 对应指令freturn
                this.code = [0xfe, 0xae];
                break;
            case 'J':
                // 对应指令lreturn
                this.code = [0xfe, 0xad];
                break;
            case 'L':
            case '[':
                // 对应指令areturn
                this.code = [0xfe, 0xb0];
                break;
            default:
                // 对应指令ireturn
                this.code = [0xfe, 0xac]
        }
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
    calc_arg_slot_count(param_types) {
        this.arg_slot_count = param_types.length;

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