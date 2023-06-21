/**
 * @author: HuRuiFeng
 * @file: Object.js
 * @time: 2019/10/20 1:18
 * @desc: java.lang.Object类
 */

const register = require("../../Registry").register;
const fnv = require('fnv-plus');

// public final native Class<?> getClass();
function get_class(frame) {
    // 从局部变量表中拿到this引用
    let this_ref = frame.local_vars.get_this();
    // 有了this引用，通过get_class()方法拿到它的Class对象，通过j_class属性拿到类对象
    let clazz = this_ref.get_class().j_class;
    // 把类对象推入操作数栈顶
    frame.operand_stack.push_ref(clazz)
}

function hash_code(frame) {
    let this_ref = frame.local_vars.get_this();
    let hash_value = fnv.hash(this_ref.toString(), 32).dec();
    frame.operand_stack.push_numeric(hash_value);
}

function clone(frame) {
    let this_ref = frame.local_vars.get_this();
    let cloneable = this_ref.get_class().loader.load_class("java/lang/Cloneable");
    if (!this_ref.get_class().is_implements(cloneable)) {
        throw new Error("java.lang.CloneNotSupportedException")
    }
    frame.operand_stack.push_ref(this_ref.clone())
}

let jlObject = 'java/lang/Object';
register(jlObject, 'getClass', '()Ljava/lang/Class;', get_class);
register(jlObject, "hashCode", "()I", hash_code);
register(jlObject, "clone", "()Ljava/lang/Object;", clone);

module.exports = {
    get_class: get_class,
    hash_code: hash_code,
    clone: clone
};
