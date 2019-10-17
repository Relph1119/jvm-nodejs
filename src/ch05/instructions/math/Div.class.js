/**
 * @author: HuRuiFeng
 * @file: Div.class.js
 * @time: 2019/10/17
 * @desc: 除法(div)指令
 */

const NoOperandsInstruction = require("../base/Instruction.class").NoOperandsInstruction;

// double div
class DDIV extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_numeric();
        let v1 = stack.pop_numeric();
        let result = v1 / v2;
        stack.push_numeric(result);
    }
}

// float div
class FDIV extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_numeric();
        let v1 = stack.pop_numeric();
        let result = v1 / v2;
        stack.push_numeric(result);
    }
}

// int div
class IDIV extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_numeric();
        let v1 = stack.pop_numeric();
        if (v2 === 0) {
            throw new Error("java.lang.ArithmeticException: / by zero");
        }
        let result = v1 / v2;
        stack.push_numeric(result)
    }
}

// long div
class LDIV extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_numeric();
        let v1 = stack.pop_numeric();
        if (v2 === 0) {
            throw new Error("java.lang.ArithmeticException: / by zero");
        }
        let result = v1 / v2;
        stack.push_numeric(result)
    }
}

module.exports = {
    DDIV: DDIV,
    FDIV: FDIV,
    IDIV: IDIV,
    LDIV: LDIV
};