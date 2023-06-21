/**
 * @author: HuRuiFeng
 * @file: MethodLookup.js
 * @time: 2019/10/19 10:22
 * @desc: 查找方法
 */

/**
 * 在类中查找方法
 * @param clazz
 * @param name
 * @param descriptor
 */
function lookup_method_in_class(clazz, name, descriptor) {
    let c = clazz;
    while (c) {
        for (let method of c.methods) {
            if (method.name === name && method.descriptor === descriptor) {
                return method;
            }
        }
        c = c.super_class
    }
    return null;
}

/**
 * 在接口中查找方法
 * @param ifaces
 * @param name
 * @param descriptor
 */
function lookup_method_in_interfaces(ifaces, name, descriptor) {
    for (let iface of ifaces) {
        for (let method of iface.methods) {
            if (method.name === name && method.descriptor === descriptor) {
                return method;
            }
        }
        let method = lookup_method_in_interfaces(iface.interfaces, name, descriptor);
        if (method) {
            return method
        }
    }

    return null;
}

module.exports = {
    lookup_method_in_class: lookup_method_in_class,
    lookup_method_in_interfaces: lookup_method_in_interfaces
};
