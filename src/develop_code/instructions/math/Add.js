/**
 * @author: HuRuiFeng
 * @file: Add.js
 * @time: 2019/10/17
 * @desc: 加法(add)指令
 */
const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;

// double add
class DADD extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v1 = stack.pop_double();
        let v2 = stack.pop_double();
        let result = v1 + v2;
        stack.push_double(result);
    }
}

// float add
class FADD extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v1 = stack.pop_float();
        let v2 = stack.pop_float();
        let result = v1 + v2;
        stack.push_float(result);
    }
}

// int add
class IADD extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v1 = stack.pop_int();
        let v2 = stack.pop_int();
        let result = v1 + v2;
        stack.push_int(result);
    }
}

// long add
class LADD extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v1 = stack.pop_long();
        let v2 = stack.pop_long();
        let result = v1 + v2;
        stack.push_long(result);
    }
}

module.exports = {
    DADD: DADD,
    FADD: FADD,
    IADD: IADD,
    LADD: LADD
};
