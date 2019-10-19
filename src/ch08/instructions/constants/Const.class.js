/**
 * @author: HuRuiFeng
 * @file: Const.class.js
 * @time: 2019/10/17
 * @desc: Const系列指令
 */

const NoOperandsInstruction = require("../base/Instruction.class").NoOperandsInstruction;

// aconst_null指令把null引用推入操作数栈顶
class ACONST_NULL extends NoOperandsInstruction {
    execute(frame) {
        frame.operand_stack.push_ref(null);
    }
}

// 把double类型0推入操作数栈顶
class DCONST_0 extends NoOperandsInstruction {
    execute(frame) {
        frame.operand_stack.push_numeric(0.0);
    }
}

// 把double类型1推入操作数栈顶
class DCONST_1 extends NoOperandsInstruction {
    execute(frame) {
        frame.operand_stack.push_numeric(1.0);
    }
}

// 把float类型0推入操作数栈顶
class FCONST_0 extends NoOperandsInstruction {
    execute(frame) {
        frame.operand_stack.push_numeric(0.0);
    }
}

// 把float类型1推入操作数栈顶
class FCONST_1 extends NoOperandsInstruction {
    execute(frame) {
        frame.operand_stack.push_numeric(1.0);
    }
}

// 把float类型2推入操作数栈顶
class FCONST_2 extends NoOperandsInstruction {
    execute(frame) {
        frame.operand_stack.push_numeric(2.0);
    }
}

// 把int类型-1推入操作数栈顶
class ICONST_M1 extends NoOperandsInstruction {
    execute(frame) {
        frame.operand_stack.push_numeric(-1);
    }
}

// 把int类型0推入操作数栈顶
class ICONST_0 extends NoOperandsInstruction {
    execute(frame) {
        frame.operand_stack.push_numeric(0);
    }
}

// 把int类型1推入操作数栈顶
class ICONST_1 extends NoOperandsInstruction {
    execute(frame) {
        frame.operand_stack.push_numeric(1);
    }
}

// 把int类型2推入操作数栈顶
class ICONST_2 extends NoOperandsInstruction {
    execute(frame) {
        frame.operand_stack.push_numeric(2);
    }
}

// 把int类型3推入操作数栈顶
class ICONST_3 extends NoOperandsInstruction {
    execute(frame) {
        frame.operand_stack.push_numeric(3);
    }
}

// 把int类型4推入操作数栈顶
class ICONST_4 extends NoOperandsInstruction {
    execute(frame) {
        frame.operand_stack.push_numeric(4);
    }
}

// 把int类型5推入操作数栈顶
class ICONST_5 extends NoOperandsInstruction {
    execute(frame) {
        frame.operand_stack.push_numeric(5);
    }
}

// 把long类型0推入操作数栈顶
class LCONST_0 extends NoOperandsInstruction {
    execute(frame) {
        frame.operand_stack.push_numeric(0);
    }
}

// 把long类型1推入操作数栈顶
class LCONST_1 extends NoOperandsInstruction {
    execute(frame) {
        frame.operand_stack.push_numeric(1);
    }
}

module.exports = {
    ACONST_NULL: ACONST_NULL,
    DCONST_0: DCONST_0,
    DCONST_1: DCONST_1,
    FCONST_0: FCONST_0,
    FCONST_1: FCONST_1,
    FCONST_2: FCONST_2,
    ICONST_M1: ICONST_M1,
    ICONST_0: ICONST_0,
    ICONST_1: ICONST_1,
    ICONST_2: ICONST_2,
    ICONST_3: ICONST_3,
    ICONST_4: ICONST_4,
    ICONST_5: ICONST_5,
    LCONST_0: LCONST_0,
    LCONST_1: LCONST_1
};