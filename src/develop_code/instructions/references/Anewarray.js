/**
 * @author: HuRuiFeng
 * @file: Anewarray.js
 * @time: 2019/10/19 20:08
 * @desc: anewarray指令用来创建引用类型数组，需要两个操作数。
 第一个操作数是uint16索引，来自字节码。通过这个索引可以从当前类的运行时常量池中找到一个类符号引用，解析这个符号引用就可以得到数组元素的类。
 第二个操作数是数组长度，从操作数栈中弹出。
 */

const Index16Instruction = require("../base/Instruction").Index16Instruction;

class ANEW_ARRAY extends Index16Instruction {
    execute(frame) {
        let cp = frame.method.get_class().constant_pool;
        let class_ref = cp.get_constant(this.index);
        let component_class = class_ref.resolved_class();

        let stack = frame.operand_stack;
        let count = stack.pop_numeric();
        if (count < 0) {
            throw new Error("java.lang.NegativeArraySizeException");
        }

        let arr_class = component_class.array_class();
        let arr = arr_class.new_array(parseInt(count));
        stack.push_ref(arr);
    }
}

exports.ANEW_ARRAY = ANEW_ARRAY;
