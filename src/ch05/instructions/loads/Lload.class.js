/**
 * @author: HuRuiFeng
 * @file: LLOAD.class.js
 * @time: 2019/10/17
 * @desc: long类型变量加载指令
 */

const NoOperandsInstruction = require("../base/Instruction.class").NoOperandsInstruction;
const Index8Instruction = require("../base/Instruction.class").Index8Instruction;

function _lload(frame, index) {
    let val = frame.local_vars.get_numeric(index);
    frame.operand_stack.push_numeric(val);
}

class LLOAD extends Index8Instruction {
    execute(frame) {
        _lload(frame, this.index)
    }
}

class LLOAD_0 extends NoOperandsInstruction {
    execute(frame) {
        _lload(frame, 0);
    }
}

class LLOAD_1 extends NoOperandsInstruction {
    execute(frame) {
        _lload(frame, 1);
    }
}

class LLOAD_2 extends NoOperandsInstruction {
    execute(frame) {
        _lload(frame, 2);
    }
}

class LLOAD_3 extends NoOperandsInstruction {
    execute(frame) {
        _lload(frame, 3);
    }
}

module.exports = {
    LLOAD: LLOAD,
    LLOAD_0: LLOAD_0,
    LLOAD_1: LLOAD_1,
    LLOAD_2: LLOAD_2,
    LLOAD_3: LLOAD_3
};