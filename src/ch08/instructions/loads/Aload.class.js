/**
 * @author: HuRuiFeng
 * @file: Aload.class.js
 * @time: 2019/10/17
 * @desc: 引用类型变量加载指令
 */

const NoOperandsInstruction = require("../base/Instruction.class").NoOperandsInstruction;
const Index8Instruction = require("../base/Instruction.class").Index8Instruction;

function _aload(frame, index) {
    let ref = frame.local_vars.get_ref(index);
    frame.operand_stack.push_ref(ref);
}

class ALOAD extends Index8Instruction {
    execute(frame) {
        _aload(frame, this.index);
    }
}

class ALOAD_0 extends NoOperandsInstruction {
    execute(frame) {
        _aload(frame, 0);
    }
}

class ALOAD_1 extends NoOperandsInstruction {
    execute(frame) {
        _aload(frame, 1);
    }
}

class ALOAD_2 extends NoOperandsInstruction {
    execute(frame) {
        _aload(frame, 2);
    }
}

class ALOAD_3 extends NoOperandsInstruction {
    execute(frame) {
        _aload(frame, 3);
    }
}

module.exports = {
    ALOAD: ALOAD,
    ALOAD_0: ALOAD_0,
    ALOAD_1: ALOAD_1,
    ALOAD_2: ALOAD_2,
    ALOAD_3: ALOAD_3
};
