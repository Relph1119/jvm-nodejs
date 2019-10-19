/**
 * @author: HuRuiFeng
 * @file: CpMethodRef.class.js
 * @time: 2019/10/18 16:39
 * @desc: 方法符号引用
 */

const MethodLookup = require("./MethodLookup.class");
const MemberRef = require("./CpMemberRef.class").MemberRef;

class MethodRef extends MemberRef {
    constructor(constant_pool, ref_info) {
        super();
        this.method = null;
        this.cp = constant_pool;
        this.copy_member_ref_info(ref_info);
    }

    // 解析非接口方法
    resolved_method() {
        if (this.method === null) {
            this.resolve_method_ref()
        }
        return this.method
    }

    /**
     * 解析非接口方法符号引用
     * 如果类D想通过方法符号引用访问类C的某个方法，先要解析符号引用得到类C。
     * 如果C是接口，则抛出IncompatibleClassChangeError异常，否则根据方法名和描述符查找方法。
     * 如果找不到对应方法，则抛出NoSuchMethodError异常，否则检查类D是否有权限访问该方法。
     * 如果没有，则抛出IllegalAccessError异常。
     */
    resolve_method_ref() {
        let d = this.cp.get_class();
        let c = this.resolved_class();
        if (c.is_interface()) {
            throw new Error("java.lang.IncompatibleClassChangeError")
        }

        let method = this.lookup_method(c, this.name, this.descriptor);
        if (method === null) {
            throw new Error("java.lang.NoSuchMethodError")
        }
        if (!method.is_accessible_to(d)) {
            throw new Error("java.lang.IllegalAccessError")
        }
        this.method = method
    }

    // 根据方法名和描述符查找方法
    /**
     * 先从C的继承层次中找，如果找不到，就去C的接口中找。
     * @param clazz
     * @param name
     * @param descriptor
     */
    lookup_method(clazz, name, descriptor) {
        let method = MethodLookup.lookup_method_in_class(clazz, name, descriptor);
        if (method === null) {
            method = MethodLookup.lookup_method_in_interfaces(clazz.interfaces, name, descriptor)
        }
        return method;
    }
}

exports.MethodRef = MethodRef;
