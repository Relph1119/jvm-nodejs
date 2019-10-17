/**
 * @author: HuRuiFeng
 * @file: Astore.class.js
 * @time: 2019/10/17
 * @desc: 引用类型变量存储指令
 */

const NoOperandsInstruction = require("../base/Instruction.class").NoOperandsInstruction;
const Index8Instruction = require("../base/Instruction.class").Index8Instruction;

function _astore(frame, index) {
    let ref = frame.operand_stack.pop_ref();
    frame.local_vars.set_ref(index, ref);
}

class ASTORE extends Index8Instruction {
    execute(frame) {
        _astore(frame, this.index);
    }
}

class ASTORE_0 extends NoOperandsInstruction {
    execute(frame) {
        _astore(frame, 0);
    }
}

class ASTORE_1 extends NoOperandsInstruction {
    execute(frame) {
        _astore(frame, 1);
    }
}

class ASTORE_2 extends NoOperandsInstruction {
    execute(frame) {
        _astore(frame, 2);
    }
}

class ASTORE_3 extends NoOperandsInstruction {
    execute(frame) {
        _astore(frame, 3);
    }
}

module.exports = {
    ASTORE: ASTORE,
    ASTORE_0: ASTORE_0,
    ASTORE_1: ASTORE_1,
    ASTORE_2: ASTORE_2,
    ASTORE_3: ASTORE_3
};
