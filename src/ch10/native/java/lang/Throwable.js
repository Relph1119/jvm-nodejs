/**
 * @author: HuRuiFeng
 * @file: Throwable.js
 * @time: 2023/6/26 22:25
 * @project: jvm-nodejs
 * @desc: java.lang.Throwable类
 */

const register = require("../../Registry").register;
const format = require('string-format');
format.extend(String.prototype);

// 用于记录Java虚拟机栈帧信息
class StackTraceElement {
    constructor() {
        // 类所在的文件名
        this.file_name = "";
        // 声明方法的类名
        this.class_name = "";
        // 方法名
        this.method_name = "";
        // 帧正在执行的代码行号
        this.line_number = 0;
    }

    toString() {
        return "{0}.{1}({2}:{3})".format(this.class_name, this.method_name, this.file_name, this.line_number);
    }
}

/**
 * private native Throwable fillInStackTrace(int dummy)
 * @param frame
 */
function fill_in_stack_trace(frame) {
    let this_ref = frame.local_vars.get_this();
    frame.operand_stack.push_ref(this_ref);

    this_ref.extra = create_stack_trace_elements(this_ref, frame.thread);
}

function create_stack_trace_elements(t_obj, thread) {
    // 由于栈顶两帧正在执行fillInStackTrace(int)和fillInStackTrace()方法，需要跳过这两帧。
    // 下面几帧正在执行异常类的构造函数，也需要跳过，具体要跳过多少帧树需要看异常类的继承层次。
    let skip = distance_to_object(t_obj.get_class()) + 2;
    // 获得完整的Java虚拟机栈
    let frames = thread.get_frames().slice(skip);
    let stes = [];
    for (let frame of frames) {
        stes.push(create_stack_trace_element(frame));
    }
    return stes;
}

// 计算所需跳过的帧数
function distance_to_object(clazz) {
    let distance = 0;
    let c = clazz.super_class;
    while (c != null) {
        distance++;
        c = c.super_class;
    }
    return distance;
}

// 根据帧创建StackTraceElement实例
function create_stack_trace_element(frame) {
    let method = frame.method;
    let clazz = method.get_class();
    let stack_trace_element = new StackTraceElement();
    stack_trace_element.file_name = clazz.source_file;
    stack_trace_element.class_name = clazz.java_name();
    stack_trace_element.method_name = method.name;
    stack_trace_element.line_number = method.get_line_number(frame.next_pc - 1);

    return stack_trace_element;
}

let jlThrowable = "java/lang/Throwable"
register(jlThrowable, "fillInStackTrace",
    "(I)Ljava/lang/Throwable;", fill_in_stack_trace);

module.exports = {
    fill_in_stack_trace: fill_in_stack_trace
}
