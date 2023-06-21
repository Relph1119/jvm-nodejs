/**
 * @author: HuRuiFeng
 * @file: Return.js
 * @time: 2019/10/19 11:17
 * @desc: 返回指令，方法执行完毕之后，需要把结果返回给调用方
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;

function _numeric_return(frame) {
    let thread = frame.thread;
    let current_frame = thread.pop_frame();
    let invoker_frame = thread.top_frame();
    let val = current_frame.operand_stack.pop_numeric();
    invoker_frame.operand_stack.push_numeric(val);
}

class RETURN extends NoOperandsInstruction {
    execute(frame) {
        frame.thread.pop_frame();
    }
}

class ARETURN extends NoOperandsInstruction {
    execute(frame) {
        let thread = frame.thread;
        let current_frame = thread.pop_frame();
        let invoker_frame = thread.top_frame();
        let ref = current_frame.operand_stack.pop_ref();
        invoker_frame.operand_stack.push_ref(ref);
    }
}

class DRETURN extends NoOperandsInstruction {
    execute(frame) {
        _numeric_return(frame);
    }
}

class FRETURN extends NoOperandsInstruction {
    execute(frame) {
        _numeric_return(frame);
    }
}

class IRETURN extends NoOperandsInstruction {
    execute(frame) {
        _numeric_return(frame);
    }
}

class LRETURN extends NoOperandsInstruction {
    execute(frame) {
        _numeric_return(frame);
    }
}

module.exports = {
    RETURN: RETURN,
    ARETURN: ARETURN,
    DRETURN: DRETURN,
    FRETURN: FRETURN,
    IRETURN: IRETURN,
    LRETURN: LRETURN,
};

