/**
 * @author: HuRuiFeng
 * @file: Dstore.js
 * @time: 2019/10/17
 * @desc: double类型变量存储指令
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;
const Index8Instruction = require("../base/Instruction").Index8Instruction;

function _dstore(frame, index) {
    let val = frame.operand_stack.pop_numeric();
    frame.local_vars.set_numeric(index, val);
}

class DSTORE extends Index8Instruction {
    execute(frame) {
        _dstore(frame, this.index);
    }
}

class DSTORE_0 extends NoOperandsInstruction {
    execute(frame) {
        _dstore(frame, 0);
    }
}

class DSTORE_1 extends NoOperandsInstruction {
    execute(frame) {
        _dstore(frame, 1);
    }
}

class DSTORE_2 extends NoOperandsInstruction {
    execute(frame) {
        _dstore(frame, 2);
    }
}

class DSTORE_3 extends NoOperandsInstruction {
    execute(frame) {
        _dstore(frame, 3);
    }
}

module.exports = {
    DSTORE: DSTORE,
    DSTORE_0: DSTORE_0,
    DSTORE_1: DSTORE_1,
    DSTORE_2: DSTORE_2,
    DSTORE_3: DSTORE_3
};
