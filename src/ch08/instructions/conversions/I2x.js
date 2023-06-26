/**
 * @author: HuRuiFeng
 * @file: I2x.js
 * @time: 2019/10/17 16:52
 * @desc: int类型转换指令
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;

// Convert int to byte
class I2B extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let i = stack.pop_int();
        let b = parseInt(i);
        stack.push_int(b);
    }
}

// Convert int to char
class I2C extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let i = stack.pop_int();
        let c = parseInt(i);
        stack.push_int(c);
    }
}

// Convert int to short
class I2S extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let i = stack.pop_int();
        let s = parseInt(i);
        stack.push_int(s);
    }
}

// Convert int to double
class I2D extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let i = stack.pop_int();
        let d = parseFloat(i);
        stack.push_double(d);
    }
}

// Convert int to float
class I2F extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let i = stack.pop_int();
        let f = parseFloat(i);
        stack.push_float(f);
    }
}

// Convert int to long
class I2L extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let i = stack.pop_int();
        let l = parseInt(i);
        stack.push_long(l);
    }
}

module.exports = {
    I2B: I2B,
    I2C: I2C,
    I2S: I2S,
    I2D: I2D,
    I2F: I2F,
    I2L: I2L
};
