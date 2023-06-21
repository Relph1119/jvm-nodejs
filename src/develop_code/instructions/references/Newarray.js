/**
 * @author: HuRuiFeng
 * @file: Newarray.js
 * @time: 2019/10/19 19:59
 * @desc: newarray指令用来创建基本类型数组，包括boolean[]、byte[]、char[]、short[]、int[]、long[]、float[]和double[] 8种。
 需要两个操作数：第一个操作数是一个uint8整数，在字节码中紧跟在指令操作码后面，表示要创建哪种类型的数组。
 第二个操作数是count，从操作数栈中弹出，表示数组长度。
 */

const Instruction = require("../base/Instruction").Instruction;

class NEW_ARRAY extends Instruction {
    static AT_BOOLEAN = 4;
    static AT_CHAR = 5;
    static AT_FLOAT = 6;
    static AT_DOUBLE = 7;
    static AT_BYTE = 8;
    static AT_SHORT = 9;
    static AT_INT = 10;
    static AT_LONG = 11;

    constructor() {
        super();
        this.atype = 0
    }

    fetch_operands(reader) {
        this.atype = reader.read_uint8();
    }

    execute(frame) {
        let stack = frame.operand_stack;
        let count = stack.pop_numeric();
        // 如果count小于0，则抛出NegativeArraySizeException异常
        if (count < 0) {
            throw new Error("java.lang.NegativeArraySizeException");
        }

        // 根据atype值使用当前类的类加载器加载数组类，然后创建数组对象并推入操作数栈。
        let class_loader = frame.method.get_class().loader;
        let arr_class = NEW_ARRAY.get_primitive_array_class(class_loader, this.atype);
        let arr = arr_class.new_array(parseInt(count));
        stack.push_ref(arr);
    }

    static get_primitive_array_class(loader, atype) {
        switch (atype) {
            case NEW_ARRAY.AT_BOOLEAN:
                return loader.load_class("[Z");
            case NEW_ARRAY.AT_BYTE:
                return loader.load_class("[B");
            case NEW_ARRAY.AT_CHAR:
                return loader.load_class("[C");
            case NEW_ARRAY.AT_SHORT:
                return loader.load_class("[S");
            case NEW_ARRAY.AT_INT:
                return loader.load_class("[I");
            case NEW_ARRAY.AT_LONG:
                return loader.load_class("[J");
            case NEW_ARRAY.AT_FLOAT:
                return loader.load_class("[F");
            case NEW_ARRAY.AT_DOUBLE:
                return loader.load_class("[D");
            default:
                throw new Error("Invalid atype!")
        }

    }

}

exports.NEW_ARRAY = NEW_ARRAY;
