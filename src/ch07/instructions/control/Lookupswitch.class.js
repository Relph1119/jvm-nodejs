/**
 * @author: HuRuiFeng
 * @file: Lookupswitch.class.js
 * @time: 2019/10/17 20:03
 * @desc: switch-case语句：如果case值不可以编码成一个索引表，则实现成lookupswitch指令
 */

const branch = require("../base/BranchLogic").branch;
const NoOperandsInstruction = require("../base/Instruction.class").NoOperandsInstruction;

class LOOKUP_SWITCH extends NoOperandsInstruction {
    constructor() {
        super();
        this.default_offset = 0;
        this.n_pairs = 0;
        // 有点像Map，它的key是case值，value是跳转偏移量
        this.match_offsets = [];
    }

    fetch_operands(reader) {
        reader.skip_padding();
        this.default_offset = reader.read_int32();
        this.n_pairs = reader.read_int32();
        this.match_offsets = reader.read_int32s(this.n_pairs * 2);
    }

    execute(frame) {
        // 先从操作数栈中弹出一个int变量
        let key = frame.operand_stack.pop_numeric();
        // 然后用它查找match_offsets，看能否找到匹配的key
        for (let i = 0; i < this.n_pairs * 2; i += 2) {
            if (this.match_offsets[i] === key) {
                // 如果能，则按照value给出的偏移量跳转
                let offset = this.match_offsets[i + 1];
                branch(frame, parseInt(offset));
                return;
            }
        }
        // 否则按照default_offset跳转
        branch(frame, parseInt(this.default_offset));
    }
}

exports.LOOKUP_SWITCH = LOOKUP_SWITCH;