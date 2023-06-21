/**
 * @author: HuRuiFeng
 * @file: Method.js
 * @time: 2019/10/18 15:21
 * @desc: 方法信息
 */

const ClassMember = require("./ClassMember").ClassMember;

class Method extends ClassMember {
    constructor() {
        super();
        // 操作数栈
        this.max_stack = 0;
        // 局部变量表大小
        this.max_locals = 0;
        // 存放方法字节码
        this.code = [];
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

}

exports.Method = Method;
