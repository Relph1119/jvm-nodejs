/**
 * @author: HuRuiFeng
 * @file: Class.js
 * @time: 2019/10/18 9:43
 * @desc: 类信息
 */

const AccessFlags = require("./AccessFlags");
const ClassNameHelper = require("./ClassNameHelper");
const ObjectClass = require("./Object").ObjectClass;
const Slots = require("../Slot").Slots;
const Field = require("./Field").Field;
const Method = require("./Method").Method;
const ConstantPool = require("./ConstantPool").ConstantPool;

class Class {
    constructor() {
        // 访问标志
        this.access_flags = 0;
        // 类名（完全限定名），具有java/lang/Object的形式
        this.class_name = "";
        // 超类名（完全限定名）
        this.super_class_name = "";
        // 接口名（完全限定名）
        this.interface_names = [];
        // 运行时常量池指针
        this.constant_pool = null;
        // 字段表
        this.fields = [];
        // 方法表
        this.methods = [];
        // 加载器
        this.loader = null;
        // 超类
        this.super_class = null;
        // 接口
        this.interfaces = [];
        // 实例变量所占空间
        this.instance_slot_count = 0;
        // 类变量所占空间
        this.static_slot_count = 1;
        // 静态变量
        this.static_vars = new Slots();
        // 表示类的<clinit>方法是否已经开始执行
        this.init_started = false;
    }

    // 用来把classFile类转换成Class类
    static new_class(classFile) {
        let clazz = new Class();
        clazz.access_flags = classFile.access_flags;
        clazz.class_name = classFile.class_name();
        clazz.super_class_name = classFile.super_class_name();
        clazz.interface_names = classFile.interface_names();
        clazz.constant_pool = ConstantPool.new_constant_pool(clazz, classFile.constant_pool);
        clazz.fields = Field.new_fields(clazz, classFile.fields);
        clazz.methods = Method.new_methods(clazz, classFile.methods);
        return clazz;
    }

    // 用于判断public访问标志是否被设置
    is_public() {
        return 0 !== (this.access_flags & AccessFlags.ACC_PUBLIC);
    }

    // 用于判断final访问标志是否被设置
    is_final() {
        return 0 !== (this.access_flags & AccessFlags.ACC_FINAL);
    }

    // 用于判断super访问标志是否被设置
    is_super() {
        return 0 !== (this.access_flags & AccessFlags.ACC_SUPER);
    }

    // 用于判断interface访问标志是否被设置
    is_interface() {
        return 0 !== (this.access_flags & AccessFlags.ACC_INTERFACE);
    }

    // 用于判断abstract访问标志是否被设置
    is_abstract() {
        return 0 !== (this.access_flags & AccessFlags.ACC_ABSTRACT);
    }

    // 用于判断synthetic访问标志是否被设置
    is_synthetic() {
        return 0 !== (this.access_flags & AccessFlags.ACC_SYNTHETIC);
    }

    // 用于判断annotation访问标志是否被设置
    is_annotation() {
        return 0 !== (this.access_flags & AccessFlags.ACC_ANNOTATION);
    }

    // 用于判断enum访问标志是否被设置
    is_enum() {
        return 0 !== (this.access_flags & AccessFlags.ACC_ENUM);
    }

    //
    /**
     *  类的访问控制权限
     *  如果类D想访问类C，需要满足两个条件之一：C是public，或者C和D在同一个运行时包内。
     * @param otherClass
     */
    is_accessible_to(otherClass) {
        return this.is_public() || this.get_package_name() === otherClass.get_package_name();
    }

    // 获取类所在的包名
    get_package_name() {
        let i = this.class_name.lastIndexOf('/');
        if (i >= 0) {
            return this.class_name.substr(0, i);
        }
        return "";
    }

    /**
     * 在三种情况下，S类型的引用值可以赋值给T类型：S和T是同一类型；T是类且S是T的子类；或者T是接口且S实现了T接口
     * @param otherClass
     */
    is_assignable_from(otherClass) {
        let s = otherClass;
        let t = this;
        if (s === t) {
            return true;
        }

        if (!s.is_array()) {
            if (!s.is_interface()) {
                if (!t.is_interface()) {
                    return s.is_sub_class_of(t);
                } else {
                    return s.is_implements(t)
                }
            } else {
                if (!t.is_interface()) {
                    return t.is_jl_object()
                } else {
                    return t.is_super_interface_of(s)
                }
            }
        } else {
            if (!t.is_array()) {
                if (!t.is_interface()) {
                    return t.is_jl_object();
                } else {
                    return t.is_jl_cloneable() || t.is_jio_serializable();
                }
            } else {
                let sc = s.component_class();
                let tc = t.component_class();
                return sc === tc || tc.is_assignable_from(sc)
            }
        }
    }

    // 判断S是否是T的子类，也就是判断T是否是S的（直接或间接）超类
    is_sub_class_of(otherClass) {
        let c = this.super_class;
        while (c != null) {
            if (c === otherClass) {
                return true;
            }
            c = c.super_class;
        }
        return false;
    }

    // 判断S是否实现了T接口
    is_implements(iface) {
        let c = this;
        while (c != null) {
            for (let iface_item of c.interfaces) {
                if (iface_item === iface || iface_item.is_sub_interface_of(iface)) {
                    return true;
                }
            }
            c = c.super_class;
        }
        return false;
    }

    // 判断S是否实现了T的子接口
    is_sub_interface_of(iface) {
        for (let super_interface of this.interfaces) {
            if (super_interface === iface || super_interface.is_sub_interface_of(iface)) {
                return true;
            }
        }
        return false;
    }

    // 判断S是否是T的超类
    is_super_class_of(otherClass) {
        return otherClass.is_sub_class_of(this);
    }

    is_super_interface_of(iface) {
        return iface.is_sub_interface_of(this);
    }

    // 获得main函数方法
    get_main_method() {
        return this.get_static_method("main", "([Ljava/lang/String;)V");
    }

    get_static_method(name, descriptor) {
        for (let method of this.methods) {
            if (method.is_static() && method.name === name && method.descriptor === descriptor) {
                return method;
            }
        }
        return null;
    }

    new_object() {
        return ObjectClass.new_object(this);
    }

    start_init() {
        this.init_started = true;
    }

    get_clinit_method() {
        return this.get_static_method("<clinit>", "()V")
    }

    // 数组类
    new_array(count) {
        if (!this.is_array()) {
            throw new Error("Not array class: " + this.class_name)
        }
        return new ObjectClass(this, Array(count).fill(0));
    }

    is_array() {
        return this.class_name[0] === '[';
    }

    is_jl_object() {
        return this.class_name === "java/lang/Object";
    }

    is_jl_cloneable() {
        return this.class_name === "java/lang/Cloneable";
    }

    is_jio_serializable() {
        return this.class_name === "java/io/Serializable";
    }

    /**
     * 先根据类名得到数组类名，然后调用类加载器加载数组类。
     */
    array_class() {
        let array_class_name = ClassNameHelper.get_array_class_name(this.class_name);
        return this.loader.load_class(array_class_name)
    }

    /**
     * 返回数组类的元素类型
     * 先根据数组类名推测出数组元素类名，然后用类加载器加载元素类
     */
    component_class() {
        let component_class_name = this.get_component_class_name(this.class_name);
        return this.loader.load_class(component_class_name)
    }

    /**
     * 数组类名以[开头，把它去掉就是数组元素的类型描述符
     * @param class_name
     * @return {*}
     */
    get_component_class_name(class_name) {
        if (class_name[0] === '[') {
            let component_type_descriptor = class_name.substr(1);
            return ClassNameHelper.to_class_name(component_type_descriptor);
        }

    }

    /**
     * 根据字段名和描述符查找字段
     * @param name
     * @param descriptor
     * @param is_static_flag
     */
    get_field(name, descriptor, is_static_flag) {
        let c = this;
        while (c) {
            for (let field of c.fields) {
                if (field.is_static() === is_static_flag
                    && field.name === name && field.descriptor === descriptor) {
                    return field
                }
            }
            c = c.super_class
        }
        return null;
    }
}

exports.Class = Class;
