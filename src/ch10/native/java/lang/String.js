/**
 * @author: HuRuiFeng
 * @file: String.js
 * @time: 2019/10/20 17:02
 * @desc: java.lang.String类
 */

const StringPool = require("../../../rtda/heap/StringPool");
const register = require("../../Registry").register;

function intern(frame) {
    let this_ref = frame.local_vars.get_this();
    let interned = StringPool.intern_string(this_ref);
    frame.operand_stack.push_ref(interned);
}

register("java/lang/String", "intern",
    "()Ljava/lang/String;", intern);

module.exports = {
    intern: intern
};
