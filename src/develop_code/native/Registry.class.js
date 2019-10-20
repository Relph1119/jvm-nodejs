/**
 * @author: HuRuiFeng
 * @file: Registry.class.js
 * @time: 2019/10/19 23:51
 * @desc: 本地方法注册表，用来注册和查找本地方法
 */

global.Registry = new Map();

function native_method(frame) {

}

/**
 * 类名、方法名和方法描述符加在一起才能唯一确定一个方法，把它们的组合作为本地方法注册表的键。
 * 该函数把上面三个信息和本地方法实现关联起来。
 * @param class_name 类名
 * @param method_name 方法名
 * @param method_descriptor 方法描述符
 * @param method 本地方法
 */
function register(class_name, method_name, method_descriptor, method) {
    let key = class_name + "~" + method_name + "~" + method_descriptor;
    Registry.set(key, method);
}

/**
 * 根据类名、方法名和方法描述符查找本地方法实现，如果找不到，则返回null
 * @param class_name 类名
 * @param method_name 方法名
 * @param method_descriptor 方法描述符
 */
function find_native_method(class_name, method_name, method_descriptor) {
    let key = class_name + "~" + method_name + "~" + method_descriptor;
    let method = Registry.get(key);
    if (method){
        return method
    }
    if(method_descriptor === "()V" && method_name === "registerNatives") {
        return empty_native_method
    }
    return null;
}

function empty_native_method(frame) {
    // do nothing
}

module.exports = {
    register: register,
    find_native_method: find_native_method,
    empty_native_method: empty_native_method
};
