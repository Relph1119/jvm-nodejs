/**
 * @author: HuRuiFeng
 * @file: Invokevirtual.js
 * @time: 2019/10/18 19:58
 * @desc:
 */

const Index16Instruction = require("../base/Instruction").Index16Instruction;
let format = require('string-format');
format.extend(String.prototype);

class INVOKE_VIRTURL extends Index16Instruction {
    execute(frame) {
        let cp = frame.method.get_class().constant_pool;
        let method_ref = cp.get_constant(this.index);

        if (method_ref.name === "println") {
            let stack = frame.operand_stack;
            let descriptor = method_ref.descriptor;
            if (descriptor === "(Z)V") {
                console.log("{0}".format(stack.pop_numeric() !== 0));
            } else if (["(C)V", "(B)V", "(S)V", "(I)V", "(J)V", "(F)V", "(D)V"].includes(descriptor)) {
                console.log("{0}".format(stack.pop_numeric()));
            } else {
                throw new Error("println: " + method_ref.descriptor);
            }
            stack.pop_ref();
        }
    }
}

exports.INVOKE_VIRTURL = INVOKE_VIRTURL;
