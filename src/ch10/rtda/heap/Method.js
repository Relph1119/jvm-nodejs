/**
 * @author: HuRuiFeng
 * @file: Method.js
 * @time: 2019/10/18 15:21
 * @desc: 方法信息
 */

const AccessFlags = require("./AccessFlags");
const ClassMember = require("./ClassMember").ClassMember;
const MethodDescriptorParser = require("./MethodDescriptorParser").MethodDescriptorParser;
const {ExceptionTable, new_exception_table} = require('./ExceptionTable');
const {LineNumberTableAttribute} = require("../../classfile/AttrLineNumberTable");

class Method extends ClassMember {
    constructor() {
        super();
        // 操作数栈
        this.max_stack = 0;
        // 局部变量表大小
        this.max_locals = 0;
        // 存放方法字节码
        this.code = [];
        this.execption_table = new ExceptionTable();
        // 行号表
        this.line_number_table = new LineNumberTableAttribute();
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
        if (method.is_native()) {
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
            this.line_number_table = code_attr.line_number_table_attribute();
            this.execption_table.exception_table = new_exception_table(code_attr.exception_table, this.get_class().constant_pool);
        }
    }

    /**
     * 计算参数在局部变量表中占用多少位置
     */
    calc_arg_slot_count(param_types) {
        this.arg_slot_count = param_types.length;

        if (!this.is_static()) {
            this.arg_slot_count++;
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

    /*
     * 调用ExceptionTable.find_exception_handler()方法搜索异常处理表，
     * 如果能找到对应的异常处理项，则返回它的handler_pc字段，否则返回-1
     */
    find_exception_handler(exClass, pc) {
        let handler = this.execption_table.find_exception_handler(exClass, pc);
        if (handler) {
            return handler.handler_pc;
        }
        return -1;
    }

    /**
     * 和源文件名一样，并不是每个方法都有行号表。
     * 如果方法没有行号表，查不到pc对应的行号，返回-1。
     * 本地方法没有字节码，返回-2。
     * 剩下情况调用LineNumberTableAttribute的get_line_number()方法查找行号。
     * @param pc
     */
    get_line_number(pc) {
        if (this.is_native()) {
            return -2;
        }
        if (this.line_number_table == null) {
            return -1;
        }
        return this.line_number_table.get_line_number(pc);
    }
}

exports.Method = Method;
