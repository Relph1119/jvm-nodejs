/**
 * @author: HuRuiFeng
 * @file: Xastore.js
 * @time: 2019/10/19 20:28
 * @desc: <t>astore系列指令按索引给数组元素赋值。
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;

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

class AASTORE extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let ref = stack.pop_ref();
        let index = stack.pop_numeric();
        let arr_ref = stack.pop_ref();

        check_not_none(arr_ref);
        let ref_array = arr_ref.refs();
        check_index(ref_array.length, index);
        ref_array[index] = ref;
    }
}

class BASTORE extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let val = stack.pop_numeric();
        let index = stack.pop_numeric();
        let arr_ref = stack.pop_ref();

        check_not_none(arr_ref);
        let byte_array = arr_ref.bytes();
        check_index(byte_array.length, index);
        byte_array[index] = parseInt(val);
    }
}

class CASTORE extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let val = stack.pop_numeric();
        let index = parseInt(stack.pop_numeric());
        let arr_ref = stack.pop_ref();

        check_not_none(arr_ref);
        let char_array = arr_ref.chars();
        check_index(char_array.length, index);
        char_array[index] = parseInt(val);
    }
}

class DASTORE extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let val = stack.pop_double();
        let index = stack.pop_numeric();
        let arr_ref = stack.pop_ref();

        check_not_none(arr_ref);
        let double_array = arr_ref.doubles();
        check_index(double_array.length, index);
        double_array[index] = parseFloat(val);
    }
}

class FASTORE extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let val = stack.pop_float();
        let index = stack.pop_numeric();
        let arr_ref = stack.pop_ref();

        check_not_none(arr_ref);
        let float_array = arr_ref.floats();
        check_index(float_array.length, index);
        float_array[index] = parseFloat(val);
    }
}

class IASTORE extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let val = stack.pop_numeric();
        let index = stack.pop_numeric();
        let arr_ref = stack.pop_ref();

        check_not_none(arr_ref);
        let int_array = arr_ref.ints();
        check_index(int_array.length, index);
        int_array[index] = parseInt(val);
    }
}

class LASTORE extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let val = stack.pop_numeric();
        let index = stack.pop_numeric();
        let arr_ref = stack.pop_ref();

        check_not_none(arr_ref);
        let long_array = arr_ref.longs();
        check_index(long_array.length, index);
        long_array[index] = val;
    }
}

class SASTORE extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let val = stack.pop_numeric();
        let index = stack.pop_numeric();
        let arr_ref = stack.pop_ref();

        check_not_none(arr_ref);
        let short_array = arr_ref.shorts();
        check_index(short_array.length, index);
        short_array[index] = parseInt(val);
    }
}

module.exports = {
    AASTORE: AASTORE,
    BASTORE: BASTORE,
    CASTORE: CASTORE,
    DASTORE: DASTORE,
    FASTORE: FASTORE,
    IASTORE: IASTORE,
    LASTORE: LASTORE,
    SASTORE: SASTORE
};

