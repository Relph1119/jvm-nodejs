/**
 * @author: HuRuiFeng
 * @file: FLOAD.class.js
 * @time: 2019/10/17
 * @desc: float类型变量加载指令
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;
const Index8Instruction = require("../base/Instruction").Index8Instruction;

function _fload(frame, index) {
    let val = frame.local_vars.get_float(index);
    frame.operand_stack.push_float(val);
}

class FLOAD extends Index8Instruction {
    execute(frame) {
        _fload(frame, this.index)
    }
}

class FLOAD_0 extends NoOperandsInstruction {
    execute(frame) {
        _fload(frame, 0);
    }
}

class FLOAD_1 extends NoOperandsInstruction {
    execute(frame) {
        _fload(frame, 1);
    }
}

class FLOAD_2 extends NoOperandsInstruction {
    execute(frame) {
        _fload(frame, 2);
    }
}

class FLOAD_3 extends NoOperandsInstruction {
    execute(frame) {
        _fload(frame, 3);
    }
}

module.exports = {
    FLOAD: FLOAD,
    FLOAD_0: FLOAD_0,
    FLOAD_1: FLOAD_1,
    FLOAD_2: FLOAD_2,
    FLOAD_3: FLOAD_3
};
