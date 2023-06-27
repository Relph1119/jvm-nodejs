/**
 * @author: HuRuiFeng
 * @file: Dload.js
 * @time: 2019/10/17
 * @desc: double类型变量加载指令
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;
const Index8Instruction = require("../base/Instruction").Index8Instruction;

function _dload(frame, index) {
    let val = frame.local_vars.get_double(index);
    frame.operand_stack.push_double(val);
}

class DLOAD extends Index8Instruction {
    execute(frame) {
        _dload(frame, this.index)
    }
}

class DLOAD_0 extends NoOperandsInstruction {
    execute(frame) {
        _dload(frame, 0);
    }
}

class DLOAD_1 extends NoOperandsInstruction {
    execute(frame) {
        _dload(frame, 1);
    }
}

class DLOAD_2 extends NoOperandsInstruction {
    execute(frame) {
        _dload(frame, 2);
    }
}

class DLOAD_3 extends NoOperandsInstruction {
    execute(frame) {
        _dload(frame, 3);
    }
}

module.exports = {
    DLOAD: DLOAD,
    DLOAD_0: DLOAD_0,
    DLOAD_1: DLOAD_1,
    DLOAD_2: DLOAD_2,
    DLOAD_3: DLOAD_3
};
