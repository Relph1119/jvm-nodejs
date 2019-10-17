/**
 * @author: HuRuiFeng
 * @file: ILOAD.class.js
 * @time: 2019/10/17
 * @desc: int变量加载指令
 */

const NoOperandsInstruction = require("../base/Instruction.class").NoOperandsInstruction;
const Index8Instruction = require("../base/Instruction.class").Index8Instruction;

function _iload(frame, index) {
    let val = frame.local_vars.get_numeric(index);
    frame.operand_stack.push_numeric(val);
}

class ILOAD extends Index8Instruction {
    execute(frame) {
        _iload(frame, this.index)
    }
}

class ILOAD_0 extends NoOperandsInstruction {
    execute(frame) {
        _iload(frame, 0);
    }
}

class ILOAD_1 extends NoOperandsInstruction {
    execute(frame) {
        _iload(frame, 1);
    }
}

class ILOAD_2 extends NoOperandsInstruction {
    execute(frame) {
        _iload(frame, 2);
    }
}

class ILOAD_3 extends NoOperandsInstruction {
    execute(frame) {
        _iload(frame, 3);
    }
}

module.exports = {
    ILOAD: ILOAD,
    ILOAD_0: ILOAD_0,
    ILOAD_1: ILOAD_1,
    ILOAD_2: ILOAD_2,
    ILOAD_3: ILOAD_3
};