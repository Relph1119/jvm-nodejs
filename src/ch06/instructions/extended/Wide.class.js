/**
 * @author: HuRuiFeng
 * @file: Wide.class.js
 * @time: 2019/10/17 20:23
 * @desc: 加载类指令、存储类指令、ret指令和iinc指令需要按索引访问局部变量表，索引以uint8的形式存在字节码中。
 对于大部分方法来说，局部变量表大小都不会超过256，
 所以用一字节表示索引就够了，如果有方法超过这限制，就用wide指令扩展。
 wide指令只是增加索引宽度，并不改变子指令操作。
 */

const ASTORE = require("../stores/Astore.class").ASTORE;
const DSTORE = require("../stores/Dstore.class").DSTORE;
const FSTORE = require("../stores/Fstore.class").FSTORE;
const LSTORE = require("../stores/Lstore.class").LSTORE;
const ISTORE = require("../stores/Istore.class").ISTORE;
const ALOAD = require("../loads/Aload.class").ALOAD;
const DLOAD = require("../loads/Dload.class").DLOAD;
const FLOAD = require("../loads/Fload.class").FLOAD;
const LLOAD = require("../loads/Lload.class").LLOAD;
const ILOAD = require("../loads/Iload.class").ILOAD;
const NoOperandsInstruction = require("../base/Instruction.class").NoOperandsInstruction;
const IINC = require("../math/Iinc.class").IINC;

class WIDE extends NoOperandsInstruction {
    constructor() {
        super();
        this.modified_instruction = null;
    }

    fetch_operands(reader) {
        let opcode = reader.read_uint8();
        let inst;
        switch (opcode) {
            case 0x15:
                inst = new ILOAD();
                inst.index = reader.read_uint16();
                this.modified_instruction = inst;
                break;
            case 0x16:
                inst = new LLOAD();
                inst.index = reader.read_uint16();
                this.modified_instruction = inst;
                break;
            case 0x17:
                inst = new FLOAD();
                inst.index = reader.read_uint16();
                this.modified_instruction = inst;
                break;
            case 0x18:
                inst = new DLOAD();
                inst.index = reader.read_uint16();
                this.modified_instruction = inst;
                break;
            case 0x19:
                inst = new ALOAD();
                inst.index = reader.read_uint16();
                this.modified_instruction = inst;
                break;
            case 0x36:
                inst = new ISTORE();
                inst.index = reader.read_uint16();
                this.modified_instruction = inst;
                break;
            case 0x37:
                inst = new LSTORE();
                inst.index = reader.read_uint16();
                this.modified_instruction = inst;
                break;
            case 0x38:
                inst = new FSTORE();
                inst.index = reader.read_uint16();
                this.modified_instruction = inst;
                break;
            case 0x39:
                inst = new DSTORE();
                inst.index = reader.read_uint16();
                this.modified_instruction = inst;
                break;
            case 0x3a:
                inst = new ASTORE();
                inst.index = reader.read_uint16();
                this.modified_instruction = inst;
                break;
            case 0x84:
                inst = new IINC();
                inst.index = reader.read_uint16();
                inst.const = reader.read_int16();
                this.modified_instruction = inst;
                break;
            case 0xa9:
                throw new Error("Unsupported opcode: 0xa9!");
        }

    }

    execute(frame) {
        this.modified_instruction.execute(frame);
    }

}

exports.WIDE = WIDE;