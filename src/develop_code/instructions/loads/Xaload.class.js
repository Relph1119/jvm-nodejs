/**
 * @author: HuRuiFeng
 * @file: Xaload.class.js
 * @time: 2019/10/19 20:17
 * @desc: <t>aload系列指令按索引获取数组元素值，然后推入操作数栈。
 */

const NoOperandsInstruction = require("../base/Instruction.class").NoOperandsInstruction;

function check_not_none(ref) {
    if (!ref) {
        throw new Error("java.lang.NullPointerException");
    }
}

function check_index(arr_len, index) {
    // 如果数组索引小于0，或者大于等于数组长度，则抛出ArrayIndexOutOfBoundsException异常
    if (index < 0 || index >= parseInt(arr_len)) {
        throw new Error("ArrayIndexOutOfBoundsException")
    }
}

class AALOAD extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let index = stack.pop_numeric();
        let arr_ref = stack.pop_ref();

        // 检查第二个操作数：数组引用
        check_not_none(arr_ref);
        let ref_array = arr_ref.refs();
        // 检查数组索引
        check_index(ref_array.length, index);
        stack.push_ref(ref_array[index])
    }
}

class BALOAD extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let index = stack.pop_numeric();
        let arr_ref = stack.pop_ref();

        check_not_none(arr_ref);
        let bytes_array = arr_ref.bytes();
        check_index(bytes_array.length, index);
        stack.push_numeric(bytes_array[index])
    }
}

class CALOAD extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let index = stack.pop_numeric();
        let arr_ref = stack.pop_ref();

        check_not_none(arr_ref);
        let char_array = arr_ref.chars();
        check_index(char_array.length, index);
        stack.push_numeric(char_array[index])
    }
}

class DALOAD extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let index = stack.pop_numeric();
        let arr_ref = stack.pop_ref();

        check_not_none(arr_ref);
        let double_array = arr_ref.doubles();
        check_index(double_array.length, index);
        stack.push_numeric(double_array[index])
    }
}

class FALOAD extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let index = stack.pop_numeric();
        let arr_ref = stack.pop_ref();

        check_not_none(arr_ref);
        let float_array = arr_ref.floats();
        check_index(float_array.length, index);
        stack.push_numeric(float_array[index])
    }
}

class IALOAD extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let index = stack.pop_numeric();
        let arr_ref = stack.pop_ref();

        check_not_none(arr_ref);
        let int_array = arr_ref.ints();
        check_index(int_array.length, index);
        stack.push_numeric(int_array[index])
    }
}

class LALOAD extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let index = stack.pop_numeric();
        let arr_ref = stack.pop_ref();

        check_not_none(arr_ref);
        let long_array = arr_ref.longs();
        check_index(long_array.length, index);
        stack.push_numeric(long_array[index])
    }
}

class SALOAD extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let index = stack.pop_numeric();
        let arr_ref = stack.pop_ref();

        check_not_none(arr_ref);
        let short_array = arr_ref.shorts();
        check_index(short_array.length, index);
        stack.push_numeric(short_array[index])
    }
}

module.exports = {
    AALOAD: AALOAD,
    BALOAD: BALOAD,
    CALOAD: CALOAD,
    DALOAD: DALOAD,
    FALOAD: FALOAD,
    IALOAD: IALOAD,
    LALOAD: LALOAD,
    SALOAD: SALOAD
};