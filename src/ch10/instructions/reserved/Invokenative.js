/**
 * @author: HuRuiFeng
 * @file: Invokenative.js
 * @time: 2019/10/20 0:19
 * @desc: invokenative指令，调用本地方法
 */

const find_native_method = require("../../native/Registry").find_native_method;
const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;

let LOAD_MODULES = [
    '../../native/Registry',
    '../../native/java/lang/Class',
    '../../native/java/lang/Double',
    '../../native/java/lang/Float',
    '../../native/java/lang/Object',
    '../../native/java/lang/String',
    '../../native/java/lang/System',
    '../../native/java/lang/Throwable',
    '../../native/sun/misc/VM'
];

class INVOKE_NATIVE extends NoOperandsInstruction {
    execute(frame) {
        let method = frame.method;
        let class_name = method.get_class().class_name;
        let method_name = method.name;
        let method_descriptor = method.descriptor;

        for (let load_module of LOAD_MODULES) {
            require(load_module);
        }

        // 根据类名、方法名和方法描述符从本地方法注册表中查找本地方法实现
        let native_method = find_native_method(class_name, method_name, method_descriptor);
        // 如果找不到，抛出UnstatisfiedLinkError异常
        if (!native_method) {
            let method_info = class_name + '.' + method_name + method_descriptor;
            throw new Error("java.lang.UnstatisfiedLinkError: " + method_info);
        }

        // 遍历所有的本地方法所在的模块
        for (let load_module of LOAD_MODULES) {
            // 加载该模块，判断里面是否有native_method方法
            const md = require(load_module);
            if (Object.getOwnPropertyDescriptors(md).hasOwnProperty(native_method.name)) {
                let func = Object.getOwnPropertyDescriptors(md)[native_method.name].value;
                func.call(func, frame);
                return;
            }
        }
    }
}

module.exports = {
    INVOKE_NATIVE: INVOKE_NATIVE,
};
