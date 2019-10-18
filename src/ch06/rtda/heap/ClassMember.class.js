/**
 * @author: HuRuiFeng
 * @file: ClassMember.class.js
 * @time: 2019/10/18 15:22
 * @desc: 类成员信息，由于字段和方法都属于类的成员，它们有一些相同的信息（访问标志、名字、描述符）。
 */

const AccessFlags = require("./AccessFlags");

class ClassMember {
    constructor() {
        // 访问标志
        this.access_flags = 0;
        // 名字
        this.name = "";
        // 描述符
        this.descriptor = "";
        // 存放Class类指针
        this._class = null;
    }

    get_class() {
        return this._class;
    }

    set_class(clazz) {
        this._class = clazz;
    }

    // 从class文件中复制数据
    copy_member_info(member_info) {
        this.access_flags = member_info.access_flags;
        this.name = member_info.name();
        this.descriptor = member_info.descriptor();
    }

    // 用于判断public访问标志是否被设置
    is_public() {
        return 0 !== (this.access_flags & AccessFlags.ACC_PUBLIC);
    }

    // 用于判断private访问标志是否被设置
    is_private() {
        return 0 !== (this.access_flags & AccessFlags.ACC_PRIVATE);
    }

    // 用于判断protected访问标志是否被设置
    is_protected() {
        return 0 !== (this.access_flags & AccessFlags.ACC_PROTECTED);
    }

    // 用于判断static访问标志是否被设置
    is_static() {
        return 0 !== (this.access_flags & AccessFlags.ACC_STATIC);
    }

    // 用于判断final访问标志是否被设置
    is_final() {
        return 0 !== (this.access_flags & AccessFlags.ACC_FINAL);
    }

    // 用于判断synthetic访问标志是否被设置
    is_synthetic() {
        return 0 !== (this.access_flags & AccessFlags.ACC_SYNTHETIC)
    }


    /**
     * 类成员的访问控制规则
     * 如果字段是public，这任何类都可以访问。
     * 如果字段是protected，则只有子类和同一包下的类可以访问。
     * 如果字段有默认访问权限（非public，非protected，也非private），则只有同一个包下的类可以访问。
     * 否则，字段是private，只有声明这个字段的类才能访问
     * @param d
     */
    is_accessible_to(d) {
        if (this.is_public()) {
            return true;
        }
        let c = this._class;
        if (this.is_protected()) {
            return d === c || d.is_sub_class_of(c) || c.get_package_name() === d.get_package_name()
        }
        if (!this.is_private()) {
            return c.get_package_name() === d.get_package_name()
        }
        return d === c;
    }

}

exports.ClassMember = ClassMember;