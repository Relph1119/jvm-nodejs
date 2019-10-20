/**
 * @author: HuRuiFeng
 * @file: VM.class.js
 * @time: 2019/10/20 18:38
 * @desc: sun.misc.VM类
 */

const StringPool = require("../../../rtda/heap/StringPool.class");
const register = require("../../Registry.class").register;
const MethodInvokeLogic = require("../../../instructions/base/MethodInvokeLogic.class");

function initialize(frame) {
    let vm_class = frame.method.get_class();
    let saved_props = vm_class.get_ref_var("savedProps", "Ljava/util/Properties;");
    let key = StringPool.j_string(vm_class.loader, "foo");
    let val = StringPool.j_string(vm_class.loader, "bar");
    frame.operand_stack.push_ref(saved_props);
    frame.operand_stack.push_ref(key);
    frame.operand_stack.push_ref(val);
    let props_class = vm_class.loader.load_class("java/util/Properties");
    let set_prop_method = props_class.get_instance_method("setProperty",
        "(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/Object;");
    MethodInvokeLogic.invoke_method(frame, set_prop_method);
}

register("sun/misc/VM", "initialize", "()V", initialize);

module.exports = {
    initialize: initialize
};