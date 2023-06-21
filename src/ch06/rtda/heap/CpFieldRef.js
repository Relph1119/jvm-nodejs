/**
 * @author: HuRuiFeng
 * @file: CpFieldRef.js
 * @time: 2019/10/18 16:22
 * @desc: 字段符号引用
 */

const MemberRef = require("./CpMemberRef").MemberRef;

class FieldRef extends MemberRef {
    constructor(constant_pool, ref_info) {
        super();
        this.field = null;
        this.cp = constant_pool;
        this.copy_member_ref_info(ref_info);
    }

    // 字段解析
    resolve_field() {
        if (this.field === null) {
            this.resolve_field_ref();
        }
        return this.field
    }

    /**
     * 字段符号引用解析
     * 如果类D想通过字段符号引用访问类C的某个字段，首先要解析符号引用得到类C，然后根据字段名和描述符查找字段。
     * 如果字段查找失败，则虚拟机排除NoSuchFieldError异常。
     * 如果查找成功，但D没有足够的权限访问该字段，则虚拟机抛出IllegalAccessError异常。
     */
    resolve_field_ref() {
        let d = this.cp.get_class();
        let c = this.resolved_class();
        let field = FieldRef.lookup_field(c, this.name, this.descriptor);

        if (field === null) {
            throw new Error("java.lang.NoSuchFieldError");
        }

        if (!field.is_accessible_to(d)) {
            throw new Error("java.lang.IllegalAccessError")
        }

        this.field = field
    }

    /**
     * 字段查找
     * 首先在C的字段中查找，如果找不到，在C的直接接口递归应用这个查找过程。
     * 如果还是找不到，在C的超类中递归应用这个查找过程。
     * 如果仍然找不到，则查找失败。
     * @param c
     * @param name
     * @param descriptor
     */
    static lookup_field(c, name, descriptor) {
        for (let field of c.fields) {
            if (field.name === name && field.descriptor === descriptor) {
                return field
            }
        }

        for (let iface_item of c.interfaces) {
            let field = FieldRef.lookup_field(iface_item, name, descriptor);
            if (field) {
                return field;
            }
        }

        if (c.super_class) {
            return FieldRef.lookup_field(c.super_class, name, descriptor)
        }

        return null;
    }

}

exports.FieldRef = FieldRef;
