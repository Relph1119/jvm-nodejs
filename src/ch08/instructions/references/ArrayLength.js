/**
 * @author: HuRuiFeng
 * @file: ArrayLength.js
 * @time: 2019/10/19 20:12
 * @desc: arraylength指令用于获取数组长度，只需要一个操作数，即从操作数栈顶弹出的数组引用。
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;

class ARRAY_LENGTH extends NoOperandsInstruction {

    execute(frame) {
        let stack = frame.operand_stack;
        let arr_ref = stack.pop_ref();
        // 如果数组引用是null，则抛出NullPointerException异常
        if (!arr_ref) {
            throw new Error("java.lang.NullPointerException");
        }

        // 否则获得数组长度，推入操作数栈
        let arr_len = arr_ref.array_length();
        stack.push_int(arr_len);
    }
}

exports.ARRAY_LENGTH = ARRAY_LENGTH;
