/**
 * @author: HuRuiFeng
 * @file: Class.js
 * @time: 2019/10/20 1:38
 * @desc: java.lang.Class类
 */

const register = require("../../Registry").register;
const j_string = require("../../../rtda/heap/StringPool").j_string;
const nodejs_string = require("../../../rtda/heap/StringPool").nodejs_string;

/**
 * static native Class<?> getPrimitiveClass(String name);
 * getPrimitiveClass()是静态方法
 * @param frame
 */
function get_primitive_class(frame) {
    // 从局部变量表中拿到类名，这是个Java字符串
    let name_obj = frame.local_vars.get_ref(0);
    // 把它转成nodejs字符串
    let name = nodejs_string(name_obj);

    // 基本类型的类已经加载到了方法区中，直接调用类加载器的load_class()获取
    let loader = frame.method.get_class().loader;
    let clazz = loader.load_class(name).j_class;

    // 把类对象引用推入操作数栈顶
    frame.operand_stack.push_ref(clazz)
}

/**
 * private native String getName0()
 * @param frame
 */
function get_name_0(frame) {
    // 从局部变量表中拿到this引用，这是一个类对象引用
    let this_ref = frame.local_vars.get_this();
    // 通过extra获得与之对应的Class对象
    let clazz = this_ref.extra;

    // 获取类名
    let name = clazz.java_name();
    // 转成Java字符串
    let name_obj = j_string(clazz.loader, name);

    // 将其推入操作数栈顶
    frame.operand_stack.push_ref(name_obj)
}

/**
 * private static native boolean desiredAssertionStatus0(Class<?> clazz);
 * @param frame
 */
function desired_assertion_status_0(frame) {
    // 把false推入操作数栈顶
    frame.operand_stack.push_boolean(false)
}

register("java/lang/Class", "getPrimitiveClass",
    "(Ljava/lang/String;)Ljava/lang/Class;", get_primitive_class);
register("java/lang/Class", "getName0",
    "()Ljava/lang/String;", get_name_0);
register("java/lang/Class", "desiredAssertionStatus0",
    "(Ljava/lang/Class;)Z", desired_assertion_status_0);

module.exports = {
    get_primitive_class: get_primitive_class,
    get_name_0: get_name_0,
    desired_assertion_status_0: desired_assertion_status_0
};
