/**
 * @author: HuRuiFeng
 * @file: CpInterfaceMethodRef.js
 * @time: 2019/10/18 16:41
 * @desc:
 */

const MethodLookup = require("./MethodLookup");
const MemberRef = require("./CpMemberRef").MemberRef;

class InterfaceMethodRef extends MemberRef {
    constructor(constant_pool, ref_info) {
        super();
        this.method = null;
        this.cp = constant_pool;
        this.copy_member_ref_info(ref_info);
    }

    /**
     * 解析接口方法
     */
    resolved_interface_method() {
        if (this.method === null) {
            this.resolve_interface_method_ref();
        }
        return this.method;
    }

    /**
     * 解析接口方法符号引用
     */
    resolve_interface_method_ref() {
        let d = this.cp.get_class();
        let c = this.resolved_class();
        if (!c.is_interface()) {
            throw new Error("java.lang.IncompatibleClassChangeError")
        }

        let method = this.lookup_interface_method(c, this.name, this.descriptor);
        if (method === null) {
            throw new Error("java.lang.NoSuchMethodError")
        }
        if (!method.is_accessible_to(d)) {
            throw new Error("java.lang.IllegalAccessError")
        }

        this.method = method
    }

    /**
     * 根据方法名和描述符查找接口方法
     * @param iface
     * @param name
     * @param descriptor
     */
    lookup_interface_method(iface, name, descriptor) {
        for (let method of iface.methods) {
            if (method.name === name && method.descriptor === descriptor) {
                return method
            }
        }

        return MethodLookup.lookup_method_in_interfaces(iface.interfaces, name, descriptor)
    }
}

exports.InterfaceMethodRef = InterfaceMethodRef;
