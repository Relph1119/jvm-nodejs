/**
 * @author: HuRuiFeng
 * @file: Tableswitch.js
 * @time: 2019/10/17 20:10
 * @desc: switch-case语句：如果case值可以编码成一个索引表，则实现成tableswith指令
 */

const branch = require("../base/BranchLogic").branch;
const NoOperandsInstruction = require("../base/Instruction").NoOperandsInstruction;

class TABLE_SWITCH extends NoOperandsInstruction {
    constructor() {
        super();
        // 默认情况下执行跳转所需的字节码偏移量
        this.default_offset = 0;
        // low和high记录case的取值范围
        this.low = 0;
        this.high = 0;
        // 一个索引表，存放high-low+1个int值，对应各种case情况下，执行跳转所需的字节码偏移量
        this.jump_offsets = [];
    }

    fetch_operands(reader) {
        // tableswitch指令操作码后面有0~3字节的padding，以保证default_offset在字节码中的地址是4的倍数
        reader.skip_padding();
        this.default_offset = reader.read_int32();
        this.low = reader.read_int32();
        this.high = reader.read_int32();
        let jump_offsets_count = this.high - this.low + 1;
        this.jump_offsets = reader.read_int32s(jump_offsets_count);
    }

    execute(frame) {
        // 先从操作数栈中弹出一个int变量
        let index = frame.operand_stack.pop_int();
        // 然后看它是否在low和high给定的范围内
        let offset = 0;
        if (this.low <= index <= this.high) {
            // 如果在，则从jump_offset表中查出偏移量进行跳转
            offset = this.jump_offsets[index - this.low];
        } else {
            // 否则按照default_offset跳转
            offset = this.default_offset;
        }
        branch(frame, offset);
    }
}

exports.TABLE_SWITCH = TABLE_SWITCH;
