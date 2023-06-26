/**
 * @author: HuRuiFeng
 * @file: Istore.js
 * @time: 2019/10/17
 * @desc: int类型变量存储指令
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;
const Index8Instruction = require("../base/Instruction").Index8Instruction;

function _istore(frame, index) {
    let val = frame.operand_stack.pop_int();
    frame.local_vars.set_int(index, val);
}

class ISTORE extends Index8Instruction {
    execute(frame) {
        _istore(frame, this.index);
    }
}

class ISTORE_0 extends NoOperandsInstruction {
    execute(frame) {
        _istore(frame, 0);
    }
}

class ISTORE_1 extends NoOperandsInstruction {
    execute(frame) {
        _istore(frame, 1);
    }
}

class ISTORE_2 extends NoOperandsInstruction {
    execute(frame) {
        _istore(frame, 2);
    }
}

class ISTORE_3 extends NoOperandsInstruction {
    execute(frame) {
        _istore(frame, 3);
    }
}

module.exports = {
    ISTORE: ISTORE,
    ISTORE_0: ISTORE_0,
    ISTORE_1: ISTORE_1,
    ISTORE_2: ISTORE_2,
    ISTORE_3: ISTORE_3
};
