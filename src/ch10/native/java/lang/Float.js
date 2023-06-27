/**
 * @author: HuRuiFeng
 * @file: Float.js
 * @time: 2019/10/20 13:35
 * @desc: java.lang.Float类
 */

const register = require("../../Registry").register;

/**
 * public static native int floatToRawIntBits(float value);
 (F)I
 * @param frame
 */
function floatToRawIntBits(frame) {
    let value = frame.local_vars.get_float(0);
    frame.operand_stack.push_int(parseInt(value));
}

/**
 * public static native float intBitsToFloat(int bits);
 * (I)F
 * @param frame
 */
function intBitsToFloat(frame) {
    let bits = frame.local_vars.get_int(0);
    frame.operand_stack.push_float(bits);
}

jlFloat = "java/lang/Float";
register(jlFloat, "floatToRawIntBits", "(F)I", floatToRawIntBits);
register(jlFloat, "intBitsToFloat", "(I)F", intBitsToFloat);

module.exports = {
    floatToRawIntBits: floatToRawIntBits,
    intBitsToFloat: intBitsToFloat,
};
