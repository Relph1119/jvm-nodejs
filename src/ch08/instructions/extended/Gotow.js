/**
 * @author: HuRuiFeng
 * @file: Gotow.js
 * @time: 2019/10/17 20:16
 * @desc: goto_w指令和goto指令的唯一区别就是索引从2字节变成了4字节
 */

const branch = require("../base/BranchLogic").branch;
const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;

class GOTO_W extends NoOperandsInstruction {
    constructor() {
        super();
        this.offset = 0;
    }

    fetch_operands(reader) {
        this.offset = parseInt(reader.read_int32());
    }

    execute(frame) {
        branch(frame, this.offset);
    }

}

exports.GOTO_W = GOTO_W;
