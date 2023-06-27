/**
 * @author: HuRuiFeng
 * @file: Multianewarray.js
 * @time: 2019/10/19 20:46
 * @desc: 指令用于创建多维数组。
 第一个操作数是一个uint16索引，通过这个索引可以从运行时常量池中找到一个类符号引用，解析这个引用就可以得到多维数组类。
 第二个操作数是一个uint8整数，表示数组维度。
 还需要从操作数栈中弹出n个整数，分别白哦是每一个维度的数组长度。
 */

const objectUtil = require("../../utils/objectUtil");
const Instruction = require("../base/Instruction").Instruction;

/**
 * 从操作数栈中弹出n个int值，并确保它们都大于等于0，如果其中任何一个小于0，则抛出NegativeArraySizeException异常。
 * @param stack
 * @param dimensions
 */
function pop_and_check_counts(stack, dimensions) {
    let counts = Array(dimensions).fill(0);
    for (let i = dimensions - 1; i >= 0; i--) {
        counts[i] = stack.pop_int();
        if (counts[i] < 0) {
            throw new Error("java.lang.NegativeArraySizeException");
        }
    }

    return counts
}

function new_multi_dimensional_array(counts, arr_class) {
    let count = counts[0];
    let arr = arr_class.new_array(count);

    if (counts.length > 1) {
        let refs = arr.refs();
        for (let i = 0; i < refs.length; i++) {
            refs[i] = new_multi_dimensional_array(objectUtil.deepcopy(counts.slice(1)), arr_class.component_class());
        }
    }

    return arr
}

class MULTI_ANEW_ARRAY extends Instruction {
    constructor() {
        super();
        this.index = 0;
        this.dimensions = 0;
    }

    fetch_operands(reader) {
        this.index = reader.read_uint16();
        this.dimensions = reader.read_uint8();
    }

    execute(frame) {
        let cp = frame.method.get_class().constant_pool;
        let class_ref = cp.get_constant(parseInt(this.index));
        // 解析出来的直接就是数组类
        let arr_class = class_ref.resolved_class();

        let stack = frame.operand_stack;
        let counts = pop_and_check_counts(stack, parseInt(this.dimensions));
        let arr = new_multi_dimensional_array(counts, arr_class);
        stack.push_ref(arr)
    }
}

exports.MULTI_ANEW_ARRAY = MULTI_ANEW_ARRAY;
