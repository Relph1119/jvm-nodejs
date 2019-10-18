/**
 * @author: HuRuiFeng
 * @file: Interpreter.class.js
 * @time: 2019/10/17 20:41
 * @desc: 解释器
 */

const Thread = require("./rtda/Thread.class").Thread;
let format = require('string-format');
format.extend(String.prototype);
const BytecodeReader = require("./instructions/base/BytecodeReader.class").BytecodeReader;

const Factory = require("./instructions/Factory.class").Factory;

class Interpreter {

    static interpret(methodInfo) {
        let code_attr = methodInfo.code_attribute();
        let max_locals = code_attr.max_locals;
        let max_stack = code_attr.max_stack;
        let bytecode = code_attr.code;

        let thread = new Thread();
        let frame = thread.new_frame(max_locals, max_stack);
        thread.push_frame(frame);
        try {
            Interpreter.loop(thread, bytecode);
        } catch (e) {
            console.log("LocalVars: {0}".format(frame.local_vars.toString()));
            console.log("OperandStack: {0}".format(frame.operand_stack.toString()));
            console.log(e);
        }

    }

    static loop(thread, bytecode) {
        let frame = thread.pop_frame();
        let reader = new BytecodeReader();

        while (true) {
            let pc = frame.next_pc;
            thread.pc = pc;

            reader.reset(bytecode, pc);
            let opcode = reader.read_uint8();
            let inst = Factory.new_instruction(opcode);
            inst.fetch_operands(reader);
            frame.next_pc = reader.pc;

            console.log("pc:{0} opcode:0x{1} inst:{2} [{3}]".format(pc, opcode.toString(16), inst.constructor.name,
                Interpreter.print_obj(inst)));
            inst.execute(frame);
        }

    }

    static print_obj(obj) {
        let obj_descriptors = Object.getOwnPropertyDescriptors(obj);
        let result = [];
        for (let key in obj_descriptors) {
            result.push('{0}:{1}'.format(key, obj_descriptors[key].value));
        }
        return result.join(', ');
    }
}

exports.Interpreter = Interpreter;