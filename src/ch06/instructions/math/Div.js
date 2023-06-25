/**
 * @author: HuRuiFeng
 * @file: Div.js
 * @time: 2019/10/17
 * @desc: 除法(div)指令
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;

// double div
class DDIV extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_double();
        let v1 = stack.pop_double();
        let result = v1 / v2;
        stack.push_double(result);
    }
}

// float div
class FDIV extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_float();
        let v1 = stack.pop_float();
        let result = v1 / v2;
        stack.push_float(result);
    }
}

// int div
class IDIV extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_int();
        let v1 = stack.pop_int();
        if (v2 === 0) {
            throw new Error("java.lang.ArithmeticException: / by zero");
        }
        let result = v1 / v2;
        stack.push_int(result)
    }
}

// long div
class LDIV extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_long();
        let v1 = stack.pop_long();
        if (v2 === 0) {
            throw new Error("java.lang.ArithmeticException: / by zero");
        }
        let result = v1 / v2;
        stack.push_long(result)
    }
}

module.exports = {
    DDIV: DDIV,
    FDIV: FDIV,
    IDIV: IDIV,
    LDIV: LDIV
};
