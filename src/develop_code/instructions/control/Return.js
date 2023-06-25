/**
 * @author: HuRuiFeng
 * @file: Return.js
 * @time: 2019/10/19 11:17
 * @desc: 返回指令，方法执行完毕之后，需要把结果返回给调用方
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;

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
        let thread = frame.thread;
        let current_frame = thread.pop_frame();
        let invoker_frame = thread.top_frame();
        let val = current_frame.operand_stack.pop_double();
        invoker_frame.operand_stack.push_double(val);
    }
}

class FRETURN extends NoOperandsInstruction {
    execute(frame) {
        let thread = frame.thread;
        let current_frame = thread.pop_frame();
        let invoker_frame = thread.top_frame();
        let val = current_frame.operand_stack.pop_float();
        invoker_frame.operand_stack.push_float(val);
    }
}

class IRETURN extends NoOperandsInstruction {
    execute(frame) {
        let thread = frame.thread;
        let current_frame = thread.pop_frame();
        let invoker_frame = thread.top_frame();
        let val = current_frame.operand_stack.pop_int();
        invoker_frame.operand_stack.push_int(val);
    }
}

class LRETURN extends NoOperandsInstruction {
    execute(frame) {
        let thread = frame.thread;
        let current_frame = thread.pop_frame();
        let invoker_frame = thread.top_frame();
        let val = current_frame.operand_stack.pop_long();
        invoker_frame.operand_stack.push_long(val);
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

