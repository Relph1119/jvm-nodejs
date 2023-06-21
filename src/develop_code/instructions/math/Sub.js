/**
 * @author: HuRuiFeng
 * @file: Sub.js
 * @time: 2019/10/17 16:45
 * @desc: 减法(sub)指令
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;

// double sub
class DSUB extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_double();
        let v1 = stack.pop_double();
        let result = v1 - v2;
        stack.push_double(result);
    }
}

// float sub
class FSUB extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_float();
        let v1 = stack.pop_float();
        let result = v1 - v2;
        stack.push_float(result);
    }
}

// int sub
class ISUB extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_numeric();
        let v1 = stack.pop_numeric();
        let result = v1 - v2;
        stack.push_numeric(result);
    }
}

// long sub
class LSUB extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_numeric();
        let v1 = stack.pop_numeric();
        let result = BigInt(v1) - BigInt(v2);
        stack.push_numeric(result);
    }
}

module.exports = {
    DSUB: DSUB,
    FSUB: FSUB,
    ISUB: ISUB,
    LSUB: LSUB
};
