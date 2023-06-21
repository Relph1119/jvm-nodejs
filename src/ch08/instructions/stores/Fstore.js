/**
 * @author: HuRuiFeng
 * @file: Fstore.js
 * @time: 2019/10/17
 * @desc: float类型变量存储指令
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;
const Index8Instruction = require("../base/Instruction").Index8Instruction;

function _fstore(frame, index) {
    let val = frame.operand_stack.pop_numeric();
    frame.local_vars.set_numeric(index, val);
}

class FSTORE extends Index8Instruction {
    execute(frame) {
        _fstore(frame, this.index);
    }
}

class FSTORE_0 extends NoOperandsInstruction {
    execute(frame) {
        _fstore(frame, 0);
    }
}

class FSTORE_1 extends NoOperandsInstruction {
    execute(frame) {
        _fstore(frame, 1);
    }
}

class FSTORE_2 extends NoOperandsInstruction {
    execute(frame) {
        _fstore(frame, 2);
    }
}

class FSTORE_3 extends NoOperandsInstruction {
    execute(frame) {
        _fstore(frame, 3);
    }
}

module.exports = {
    FSTORE: FSTORE,
    FSTORE_0: FSTORE_0,
    FSTORE_1: FSTORE_1,
    FSTORE_2: FSTORE_2,
    FSTORE_3: FSTORE_3
};
