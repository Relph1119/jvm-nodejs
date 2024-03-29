/**
 * @author: HuRuiFeng
 * @file: Double.js
 * @time: 2019/10/20 16:59
 * @desc: java.lang.Double类
 */

const register = require("../../Registry").register;

/**
 * public static native long doubleToRawLongBits(double value);
 * (D)J
 * @param frame
 */
function doubleToRawLongBits(frame) {
    let value = frame.local_vars.get_double(0);
    frame.operand_stack.push_long(value);
}

/**
 * public static native double longBitsToDouble(long bits);
 * (J)D
 * @param frame
 */
function longBitsToDouble(frame) {
    let bits = frame.local_vars.get_long(0);
    frame.operand_stack.push_double(bits);
}

jlDouble = "java/lang/Double";
register(jlDouble, "doubleToRawLongBits", "(D)J", doubleToRawLongBits);
register(jlDouble, "longBitsToDouble", "(J)D", longBitsToDouble);

module.exports = {
    doubleToRawLongBits: doubleToRawLongBits,
    longBitsToDouble: longBitsToDouble,
};
