/**
 * @author: HuRuiFeng
 * @file: Interpreter.js
 * @time: 2019/10/17 20:41
 * @desc: 解释器
 */

const Thread = require("./rtda/Thread").Thread;
const format = require('string-format');
format.extend(String.prototype);
const BytecodeReader = require("./instructions/base/BytecodeReader").BytecodeReader;

const Factory = require("./instructions/Factory").Factory;

class Interpreter {

    static interpret(method) {
        let thread = new Thread();
        let frame = thread.new_frame(method);
        thread.push_frame(frame);
        try {
            Interpreter.loop(thread, method.code);
        } catch (e) {
            // 用于调试，可以注释掉
            // console.log("LocalVars: {0}".format(frame.local_vars.toString()));
            // console.log("OperandStack: {0}".format(frame.operand_stack.toString()));
            // console.log(e);
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
