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
const PrimitiveTypes = require("./ClassNameHelper.class").PrimitiveTypes;
const j_string = require("./StringPool.class").j_string;

class ClassLoader {
    constructor(class_path, verbose_flag) {
        // 保存Classpath
        this.cp = class_path;
        // 加载信息选项
        this.verbose_flag = verbose_flag;
        // 记录已经加载的类数据
        this.class_map = new Map();
        this.load_basic_classes();
        this.load_primitive_classes();
    }

    // 把类数据加载到方法区
    load_class(name) {
        let clazz = this.class_map.get(name);
        if (clazz) {
            // 类已经加载
            return clazz
        } else if (name[0] === '[') {
            clazz = this.load_array_class(name);
        } else {
            clazz = this.load_non_array_class(name);
        }

        // 在类加载完之后，判断java.lang.Class是否已经加载。
        let jl_class_class = this.class_map.get('java/lang/Class');
        if (jl_class_class) {
            // 如果加载，则给类关联类对象
            clazz.j_class = jl_class_class.new_object();
            clazz.j_class.extra = clazz;
        }

        return clazz;
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
        let class_file = new ClassFile();
        let result = class_file.parse(data);
        if (result.error) {
            console.log(result.error);
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
            } else if (field.descriptor === 'D') {
                let val = constant_pool.get_constant(cp_index);
                static_vars.set_double(slot_id, val);
            } else if (field.descriptor === 'F') {
                let val = constant_pool.get_constant(cp_index);
                static_vars.set_float(slot_id, val);
            } else if (field.descriptor === "Ljava/lang/String") {
                let nodejs_str = constant_pool.get_constant(cp_index);
                let j_str = j_string(clazz.loader, nodejs_str);
                static_vars.set_ref(slot_id, j_str);
            }
        }
    }

    load_basic_classes() {
        // 先加载java.lang.Class类
        let jl_class_class = this.load_class("java/lang/Class");
        // 遍历class_map，给已经加载的每个类关联类的对象。
        for (let [_, clazz] of this.class_map) {
            if (!clazz.j_class) {
                clazz.j_class = jl_class_class.new_object();
            }
            clazz.j_class.extra = clazz;
        }
    }

    // 加载基本类型的类
    load_primitive_classes() {
        for (let [primitive_type, _] of PrimitiveTypes) {
            // primitive_type是void、int、float等
            this.load_primitive_class(primitive_type);
        }
    }

    /**
     * 加载基本类型的单个类
     * 有3点说明：1. void和基本类型的类名就是void、int、float等。
     * 2. 基本类型的类没有超类，也没有实现任何接口。
     * 3. 非基本类型的类对象是通过ldc指令加载到操作数栈中的。
     而基本类型的类对象，虽然在Java代码中看起来是通过字面量获取的，但是编译之后的指令并不是ldc，而是getstatic。
     * @param class_name
     */
    load_primitive_class(class_name) {
        let clazz = new Class();
        clazz.access_flags = AccessFlags.ACC_PUBLIC;
        clazz.class_name = class_name;
        clazz.loader = this;
        clazz.init_started = true;

        clazz.j_class = this.class_map.get('java/lang/Class').new_object();
        clazz.j_class.extra = clazz;
        this.class_map.set(class_name, clazz);
    }
}

exports.ClassLoader = ClassLoader;