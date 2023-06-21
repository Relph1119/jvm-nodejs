/**
 * @author: HuRuiFeng
 * @file: ClassNameHelper.js
 * @time: 2019/10/19 19:37
 * @desc: 类名-数组类名工具
 */

let PrimitiveTypes = new Map();
PrimitiveTypes.set("void", "V");
PrimitiveTypes.set("boolean", "Z");
PrimitiveTypes.set("byte", "B");
PrimitiveTypes.set("short", "S");
PrimitiveTypes.set("int", "I");
PrimitiveTypes.set("long", "J");
PrimitiveTypes.set("char", "C");
PrimitiveTypes.set("float", "F");
PrimitiveTypes.set("double", "D");

/**
 * 根据类名得到数组类名
 * @param class_name
 * @return {string}
 */
function get_array_class_name(class_name) {
    // 把类名转变成类型描述符，然后在前面加上[
    return "[" + to_descriptor(class_name)
}

/**
 * 把类名转变成类型描述符
 * @param class_name
 * @return {*}
 */
function to_descriptor(class_name) {
    if (class_name[0] === '[') {
        return class_name;
    }
    if (PrimitiveTypes.get(class_name)) {
        return PrimitiveTypes.get(class_name);
    } else {
        return "L" + class_name + ";";
    }
}

/**
 * 把类型描述符转变成类名
 * @param descriptor
 */
function to_class_name(descriptor) {
    // 如果类型描述符以[开头，则肯定是数组，描述符即是类名。
    if (descriptor[0] === '[') {
        return descriptor
    }

    // 如果类型描述符以L开头，则肯定是类描述符，去掉开头的L好末尾的;即是类名。
    if (descriptor[0] === 'L') {
        return descriptor.substr(1, descriptor.length - 1);
    }

    // 判断是否是基本类型描述符，如果是，返回基本类型名称
    for (let [class_name, d] of PrimitiveTypes) {
        if (d === descriptor) {
            return class_name;
        }
    }

    throw new Error("Invalid descriptor: " + descriptor);
}

module.exports = {
    get_array_class_name: get_array_class_name,
    to_descriptor: to_descriptor,
    to_class_name: to_class_name,
    PrimitiveTypes: PrimitiveTypes
};



