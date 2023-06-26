/**
 * @author: HuRuiFeng
 * @file: Iinc.js
 * @time: 2019/10/17
 * @desc: int变量增加常量值指令
 */

const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;

class IINC extends NoOperandsInstruction {
    constructor() {
        super();
        this.index = 0;
        this.const = 0;
    }

    // 从字节码里读取操作数
    fetch_operands(reader) {
        this.index = reader.read_uint8();
        this.const = reader.read_int8();
    }

    // 从局部变量表中读取变量，给它加上常量值，再把结果写回局部变量表
    execute(frame) {
        let local_vars = frame.local_vars;
        let val = local_vars.get_int(this.index);
        val += this.const;
        local_vars.set_int(this.index, val);
    }
}

exports.IINC = IINC;
