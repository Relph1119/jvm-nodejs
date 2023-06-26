/**
 * @author: HuRuiFeng
 * @file: Ipush.js
 * @time: 2019/10/17
 * @desc: int整型入栈指令
 */

const Instruction = require("../base/Instruction").Instruction;

// 从操作数中获取一个byte类型整数，扩展成int型，然后推入栈顶
class BIPUSH extends Instruction {
    constructor() {
        super();
        this.val = 0;
    }

    fetch_operands(reader) {
        this.val = reader.read_int8();
    }

    execute(frame) {
        let i = this.val;
        frame.operand_stack.push_int(i);
    }

}

// 从操作数中获取一个short类型整数，扩展成int型，然后推入栈顶
class SIPUSH extends Instruction {
    constructor() {
        super();
        this.val = 0;
    }

    fetch_operands(reader) {
        this.val = reader.read_int16();
    }

    execute(frame) {
        let i = this.val;
        frame.operand_stack.push_int(i);
    }
}

module.exports = {
    BIPUSH: BIPUSH,
    SIPUSH: SIPUSH
};
