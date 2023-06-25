/**
 * @author: HuRuiFeng
 * @file: Interpreter.js
 * @time: 2019/10/17 20:41
 * @desc: 解释器
 */

const Thread = require("./rtda/Thread").Thread;
const format = require('string-format');
const j_string = require("./rtda/heap/StringPool").j_string;
format.extend(String.prototype);
const BytecodeReader = require("./instructions/base/BytecodeReader").BytecodeReader;

const Factory = require("./instructions/Factory").Factory;

class Interpreter {

    static interpret(method, log_inst, args) {
        let thread = new Thread();
        let frame = thread.new_frame(method);
        thread.push_frame(frame);

        let j_args = Interpreter.create_args_array(method.get_class().loader, args);
        frame.local_vars.set_ref(0, j_args);

        try {
            Interpreter.loop(thread, log_inst);
        } catch (e) {
            Interpreter.log_frames(thread);
            console.log("LocalVars: {0}".format(frame.local_vars.toString()));
            console.log("OperandStack: {0}".format(frame.operand_stack.toString()));
            console.log(e);
        }
    }

    static loop(thread, log_inst) {
        let reader = new BytecodeReader();

        while (true) {
            let frame = thread.current_frame();
            let pc = frame.next_pc;
            thread.pc = pc;

            reader.reset(frame.method.code, pc);
            let opcode = reader.read_uint8();
            let inst = Factory.new_instruction(opcode);
            inst.fetch_operands(reader);
            frame.next_pc = reader.pc;

            if (log_inst) {
                Interpreter.log_instruction(frame, inst);
            }
            inst.execute(frame);
            if (thread.is_stack_empty()) {
                break;
            }
        }

    }

    static log_frames(thread) {
        while (!thread.is_stack_empty()) {
            let frame = thread.pop_frame();
            let method = frame.method;
            let class_name = method.get_class().class_name;
            console.log(">> pc: {0:4} {1}.{2}{3}".format(frame.next_pc, class_name, method.name, method.descriptor))
        }
    }

    static log_instruction(frame, inst) {
        let method = frame.method;
        let class_name = method.get_class().class_name;
        let method_name = method.name;
        let pc = frame.thread.pc;
        console.log("{0}.{1}() #{2} {3} {4} operand_stack: {5} local_vars: {6}".format(class_name, method_name, pc, inst.constructor.name,
            Interpreter.print_obj(inst), frame.operand_stack.toString(), frame.local_vars.toString()))
    }

    static create_args_array(loader, args) {
        let string_class = loader.load_class("java/lang/String");
        let args_array = string_class.array_class().new_array(args.length);
        let j_args = args_array.refs();
        for (let i = 0; i < args.length; i++) {
            let arg = args[i];
            j_args[i] = j_string(loader, arg);
        }
        return args_array
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
