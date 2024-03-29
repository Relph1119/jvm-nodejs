/**
 * @author: HuRuiFeng
 * @file: Sh.js
 * @time: 2019/10/17 16:33
 * @desc: 位移指令
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;

// int左位移
class ISHL extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_int();
        let v1 = stack.pop_int();
        let s = v2 & 0x1f;
        let result = v1 << s;
        stack.push_int(result);
    }
}

// int算术右位移
class ISHR extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_int();
        let v1 = stack.pop_int();
        let s = v2 & 0x1f;
        let result = v1 >> s;
        stack.push_int(result);
    }
}

// int逻辑右位移
class IUSHR extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_int();
        let v1 = stack.pop_int();
        let s = v2 & 0x1f;
        let result = v1 >> s;
        stack.push_int(result)
    }
}

// long左位移
class LSHL extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_long();
        let v1 = stack.pop_long();
        let s = v2 & 0x3f;
        let result = v1 << s;
        stack.push_long(result);
    }
}

// long算术右位移
class LSHR extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_long();
        let v1 = stack.pop_long();
        let s = v2 & 0x3f;
        let result = v1 >> s;
        stack.push_long(result);
    }
}

// long逻辑右位移
class LUSHR extends NoOperandsInstruction {
    execute(frame) {
        let stack = frame.operand_stack;
        let v2 = stack.pop_long();
        let v1 = stack.pop_long();
        let s = v2 & 0x3f;
        let result = v1 >> s;
        stack.push_long(result)
    }
}

module.exports = {
    ISHL: ISHL,
    ISHR: ISHR,
    IUSHR: IUSHR,
    LSHL: LSHL,
    LSHR: LSHR,
    LUSHR: LUSHR
};
