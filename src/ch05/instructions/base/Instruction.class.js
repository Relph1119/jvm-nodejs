/**
 * @author: HuRuiFeng
 * @file: Instruction.class.js
 * @time: 2019/10/17
 * @desc: 指令的接口类
 */

class Instruction {
    // 从字节码中提取操作数
    fetch_operands(reader) {
    }

    // 执行指令逻辑
    execute(frame) {
    }
}

// 表示没有操作数的指令
class NoOperandsInstruction extends Instruction {
    fetch_operands(reader) {
    }

    execute(frame) {
    }
}

// 表示跳转指令
class BranchInstruction extends Instruction {
    constructor() {
        super();
        // 跳转偏移量
        this.offset = 0;
    }

    fetch_operands(reader) {
        this.offset = reader.read_int16();
    }

    execute(frame) {
    }

}

// 存储和加载类指令需要根据索引存取局部变量表，索引由单字节操作数给出。
class Index8Instruction extends Instruction {
    constructor() {
        super();
        // 表示局部变量表索引
        this.index = 0;
    }

    // 从字节码中读取一个int8整数
    fetch_operands(reader) {
        this.index = reader.read_unit8();
    }

    execute(frame) {
    }
}

// 有一些指令需要访问运行时常量池，常量池索引由两字节操作数给出。
class Index16Instruction extends Instruction {
    constructor() {
        super();
        this.index = 0;
    }

    // 从字节码中读取一个uint16整数
    fetch_operands(reader) {
        this.index = reader.read_unit16();
    }

    execute(frame) {
    }
}

module.exports = {
    Instruction: Instruction,
    NoOperandsInstruction: NoOperandsInstruction,
    BranchInstruction: BranchInstruction,
    Index8Instruction: Index8Instruction,
    Index16Instruction: Index16Instruction
};