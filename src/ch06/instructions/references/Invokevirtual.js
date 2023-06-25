/**
 * @author: HuRuiFeng
 * @file: Invokevirtual.js
 * @time: 2019/10/18 19:58
 * @desc:
 */

const Index16Instruction = require("../base/Instruction").Index16Instruction;
const format = require('string-format');
format.extend(String.prototype);

class INVOKE_VIRTURL extends Index16Instruction {
    execute(frame) {
        let cp = frame.method.get_class().constant_pool;
        let method_ref = cp.get_constant(this.index);

        if (method_ref.name === "println") {
            let stack = frame.operand_stack;
            let descriptor = method_ref.descriptor;

            switch (descriptor) {
                case "(Z)V":
                    console.log("{0}".format(stack.pop_int() !== 0));
                    break;
                case "(C)V":
                case "(B)V":
                case "(S)V":
                case "(I)V":
                    console.log("{0}".format(stack.pop_int()));
                    break;
                case "(F)V":
                    console.log("{0}".format(stack.pop_float()));
                    break;
                case "(J)V":
                    console.log("{0}".format(stack.pop_long()));
                    break;
                case "(D)V":
                    console.log("{0}".format(stack.pop_double()));
                    break;
                default:
                    throw new Error("println: " + method_ref.descriptor);
            }

            stack.pop_ref();
        }
    }
}

exports.INVOKE_VIRTURL = INVOKE_VIRTURL;
