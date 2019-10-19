/**
 * @author: HuRuiFeng
 * @file: ClassLoader.class.js
 * @time: 2019/10/18 16:44
 * @desc: 类加载器
 */

let format = require('string-format');
const Slots = require("../Slot.class").Slots;
const ClassFile = require("../../classfile/ClassFile.class").ClassFile;
const Class = require("./Class.class").Class;
format.extend(String.prototype);
const AccessFlags = require("./AccessFlags");
const j_string = require("./StringPool.class").j_string;

class ClassLoader {
    constructor(class_path, verbose_flag) {
        // 保存Classpath
        this.cp = class_path;
        // 加载信息选项
        this.verbose_flag = verbose_flag;
        // 记录已经加载的类数据
        this.class_map = new Map();
    }

    // 把类数据加载到方法区
    load_class(name) {
        let clazz = this.class_map.get(name);
        if (clazz) {
            // 类已经加载
            return clazz
        } else if (name[0] === '[') {
            return this.load_array_class(name);
        } else {
            return this.load_non_array_class(name);
        }
    }

    // 数组类加载
    load_array_class(name) {
        let clazz = new Class();
        clazz.access_flags = AccessFlags.ACC_PUBLIC;
        clazz.class_name = name;
        clazz.loader = this;
        // 数组类不需要初始化，把init_started字段设置成True
        clazz.init_started = true;
        // 数组类的超类是java.lang.Object
        clazz.super_class = this.load_class("java/lang/Object");
        // 并实现了java.lang.Cloneable和java.io.Serializable接口
        clazz.interfaces = [this.load_class("java/lang/Cloneable"), this.load_class("java/io/Serializable")];
        this.class_map.set(name, clazz);
        return clazz;
    }


    // 非数组类（普通类）加载
    load_non_array_class(name) {
        // 把数据读取到内存中
        let result = this.read_class(name);
        // 解析class文件，生成虚拟机可以使用的类数据，并放入方法区
        let clazz = this.define_class(result.data);
        // 进行链接
        ClassLoader.link(clazz);
        if (this.verbose_flag) {
            console.log("[Loaded {0} from {1}]".format(name, result.entry));
        }
        return clazz;
    }

    // 读取class文件，将数据读取到内存中
    read_class(name) {
        let result = this.cp.read_class(name);
        if (result.error) {
            throw new Error("java.lang.ClassNotFoundException: " + name)
        }
        // entry: 为了打印类加载信息，把最终加载class文件的类路径项也返回给调用者
        return {data: result.data, entry: result.entry};
    }

    // 生成类数据
    define_class(data) {
        // 解析class文件
        let clazz = ClassLoader.parse_class(data);
        clazz.loader = this;
        ClassLoader.resolve_super_class(clazz);
        ClassLoader.resolve_interfaces(clazz);
        this.class_map.set(clazz.class_name, clazz);
        return clazz;
    }

    // 把class文件数据转换成Class对象
    static parse_class(data) {
        let class_file = new ClassFile(data);
        let result = class_file.parse();
        if (result.error) {
            throw new Error("java.lang.ClassFormatError!");
        } else {
            return Class.new_class(result.class_file);
        }
    }

    // 解析超类的符号引用
    static resolve_super_class(clazz) {
        if (clazz.class_name !== "java/lang/object" && clazz.super_class_name) {
            clazz.super_class = clazz.loader.load_class(clazz.super_class_name)
        }
    }

    // 解析接口的符号引用
    static resolve_interfaces(clazz) {
        let interface_count = clazz.interface_names.length;
        if (interface_count > 0) {
            for (let interfaceName of clazz.interface_names) {
                clazz.interfaces.push(clazz.loader.load_class(interfaceName))
            }
        }
    }

    // 类的链接
    static link(clazz) {
        ClassLoader.verify(clazz);
        ClassLoader.prepare(clazz);
    }

    static verify(clazz) {
    }

    static prepare(clazz) {
        // 计算实例字段的个数，同时给它们编号
        ClassLoader.calc_instance_field_slot_ids(clazz);
        // 计算静态字段的个数，同时给它们编号
        ClassLoader.calc_static_field_slot_ids(clazz);
        // 给类变量分配空间，给它们赋予初始值
        ClassLoader.alloc_and_init_static_vars(clazz);
    }

    // 计算实例字段的个数，同时给它们编号
    static calc_instance_field_slot_ids(clazz) {
        let slot_id = 0;
        if (clazz.super_class) {
            slot_id = clazz.super_class.instance_slot_count;
        }
        for (let field of clazz.fields) {
            if (!field.is_static()) {
                field.slot_id = slot_id;
                slot_id++;
                // 不需要判断long和double，每一个slot可设置为一个对象
            }
        }
        clazz.instance_slot_count = slot_id
    }

    // 计算静态字段的个数，同时给它们编号
    static calc_static_field_slot_ids(clazz) {
        let slot_id = 0;
        for (let field of clazz.fields) {
            if (field.is_static()) {
                field.slot_id = slot_id;
                slot_id++;
            }
        }

        clazz.static_slot_count = slot_id;
    }

    // 给类变量分配空间，给它们赋予初始值
    static alloc_and_init_static_vars(clazz) {
        clazz.static_vars = new Slots(clazz.static_slot_count);
        for (let field of clazz.fields) {
            if (field.is_static() && field.is_final()) {
                ClassLoader.init_static_final_var(clazz, field);
            }
        }
    }

    // 从常量池中加载常量值，然后给静态变量赋值
    static init_static_final_var(clazz, field) {
        let static_vars = clazz.static_vars;
        let constant_pool = clazz.constant_pool;
        let cp_index = field.const_value_index;
        let slot_id = field.slot_id;

        if (cp_index > 0) {
            if (["Z", "B", "C", "S", "I", "J", "F", "D"].includes(field.descriptor)) {
                let val = constant_pool.get_constant(cp_index);
                static_vars.set_numeric(slot_id, val);
            } else if (field.descriptor === "Ljava/lang/String") {
                let nodejs_str = constant_pool.get_constant(cp_index);
                let j_str = j_string(clazz.loader, nodejs_str);
                static_vars.set_ref(slot_id, j_str);
            }
        }
    }

}

exports.ClassLoader = ClassLoader;