/**
 * @author: HuRuiFeng
 * @file: Double.class.js
 * @time: 2019/10/20 16:59
 * @desc: java.lang.Double类
 */

const struct = require('python-struct');
const register = require("../../Registry.class").register;

/**
 * public static native long doubleToRawLongBits(double value);
 * (D)J
 * @param frame
 */
function doubleToRawLongBits(frame) {
    let value = frame.local_vars.get_double(0);
    let bits = struct.unpack('>q', struct.pack('>d', value))[0];
    frame.operand_stack.push_numeric(bits);
}

/**
 * public static native double longBitsToDouble(long bits);
 * (J)D
 * @param frame
 */
function longBitsToDouble(frame) {
    let bits = frame.local_vars.get_numeric(0);
    if (bits.constructor === BigInt) {
        bits = Number(bits);
    }
    let value = struct.unpack('>d', struct.pack('>q', bits))[0];
    frame.operand_stack.push_double(value);
}


jlDouble = "java/lang/Double";
register(jlDouble, "doubleToRawLongBits", "(D)J", doubleToRawLongBits);
register(jlDouble, "longBitsToDouble", "(J)D", longBitsToDouble);

module.exports = {
    doubleToRawLongBits: doubleToRawLongBits,
    longBitsToDouble: longBitsToDouble,
};