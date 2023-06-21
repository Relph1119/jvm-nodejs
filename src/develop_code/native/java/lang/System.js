/**
 * @author: HuRuiFeng
 * @file: System.js
 * @time: 2019/10/20 13:22
 * @desc: java.lang.System类
 */

const register = require("../../Registry").register;
const ObjectClass = require("../../../rtda/heap/Object").ObjectClass;

function arraycopy(frame) {
    let local_vars = frame.local_vars;
    // 从局部变量表中获取5个参数
    let src = local_vars.get_ref(0);
    let src_pos = local_vars.get_numeric(1);
    let dest = local_vars.get_ref(2);
    let dest_pos = local_vars.get_numeric(3);
    let length = local_vars.get_numeric(4);

    // 源数据和目标数组都不能为None，否则按照System类的Javadoc应抛出NullPointerException异常
    if (src == null && dest == null) {
        throw new Error("java.lang.NullPointerException")
    }

    // 源数据和目标数据必须兼容才能拷贝，否则抛出ArrayStoreException异常
    if (!check_array_copy(src, dest)) {
        throw new Error("java.lang.ArrayStoreException")
    }

    // 检查src_pos、dest_pos和length参数，有问题则抛出IndexOutOfBoundsException异常
    if (src_pos < 0 || dest_pos < 0 || length < 0
        || src_pos + length > src.array_length()
        || dest_pos + length > dest.array_length()) {
        throw new Error("java.lang.IndexOutOfBoundsException")
    }

    ObjectClass.array_copy(src, dest, src_pos, dest_pos, length);
}

function check_array_copy(src, dest) {
    let src_class = src.get_class();
    let dest_class = dest.get_class();
    // 确保src和dest都是数组
    if (!src_class.is_array() || !dest_class.is_array()) {
        return false;
    }
    // 检查数组类型，如果两者都是引用数组，则可以拷贝，否则两者必须是相同类型的基本类型数组
    if (src_class.component_class().is_primitive() || dest_class.component_class().is_primitive()) {
        return src_class === dest_class
    }
    return true;
}

register("java/lang/System", "arraycopy",
    "(Ljava/lang/Object;ILjava/lang/Object;II)V", arraycopy);

module.exports = {
    arraycopy: arraycopy
};
