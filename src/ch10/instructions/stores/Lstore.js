/**
 * @author: HuRuiFeng
 * @file: Lstore.js
 * @time: 2019/10/17
 * @desc: long类型变量存储指令
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;
const Index8Instruction = require("../base/Instruction").Index8Instruction;

function _lstore(frame, index) {
    let val = frame.operand_stack.pop_long();
    frame.local_vars.set_long(index, val);
}

class LSTORE extends Index8Instruction {
    execute(frame) {
        _lstore(frame, this.index);
    }
}

class LSTORE_0 extends NoOperandsInstruction {
    execute(frame) {
        _lstore(frame, 0);
    }
}

class LSTORE_1 extends NoOperandsInstruction {
    execute(frame) {
        _lstore(frame, 1);
    }
}

class LSTORE_2 extends NoOperandsInstruction {
    execute(frame) {
        _lstore(frame, 2);
    }
}

class LSTORE_3 extends NoOperandsInstruction {
    execute(frame) {
        _lstore(frame, 3);
    }
}

module.exports = {
    LSTORE: LSTORE,
    LSTORE_0: LSTORE_0,
    LSTORE_1: LSTORE_1,
    LSTORE_2: LSTORE_2,
    LSTORE_3: LSTORE_3
};
