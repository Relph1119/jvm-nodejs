/**
 * @author: HuRuiFeng
 * @file: ExceptionTable.js
 * @time: 2023/6/26 22:43
 * @project: jvm-nodejs
 * @desc: 异常处理表类
 */

class ExceptionTable {
    constructor() {
        this.exception_table = []
    }

    /**
     * 1. start_pc给出的是try{}语句块的第一条指令，end_pc给出的是try{}语句块的下一条指令。
     * 2. 如果catch_type是null（在class文件中是0），表示可以处理所有异常，这是用来实现finally子句的。
     * @param exClass
     * @param pc
     */
    find_exception_handler(exClass, pc) {
        for (let handler of this.exception_table) {
            if (pc >= handler.start_pc && pc < handler.end_pc) {
                if (handler.catch_type == null) {
                    return handler
                }
                let catch_class = handler.catch_type.resolved_class();
                if (catch_class === exClass || catch_class.is_super_class_of(exClass)) {
                    return handler;
                }
            }
        }
        return null;
    }
}

class ExceptionHandler {
    constructor() {
        // start_pc和end_pc可以锁定一部分字节码，这些字节码对应某个可能抛出异常的try{}代码。
        this.start_pc = 0;
        this.end_pc = 0;
        // 用于指出负责异常处理的catch{}块的位置
        this.handler_pc = 0;
        // catch_type是个索引，通过它可以从运行时常量池中查到一个类符号引用。
        this.catch_type = null;
    }


}

// 把Class文件中的异常处理表转换成ExceptionTable类型
function new_exception_table(entries, constant_pool) {
    let table = [];
    for (entry of entries) {
        let exception_handler = new ExceptionHandler();
        exception_handler.start_pc = parseInt(entry.start_pc);
        exception_handler.end_pc = parseInt(entry.end_pc);
        exception_handler.handler_pc = parseInt(entry.handler_pc);
        exception_handler.catch_type = get_catch_type(parseInt(entry.catch_type), constant_pool);
        table.push(exception_handler);
    }
    return table;
}

/**
 * 从运行时常量池中查找类符号引用。
 * 异常处理项的catch_type有可能是0，我们知道0是无效的常量池索引，
 * 但是这里0并非表示catch-none，而是表示catch-all
 * @param index
 * @param constant_pool
 */
function get_catch_type(index, constant_pool) {
    if (index === 0) {
        return null;
    }
    return constant_pool.get_constant(index);
}

module.exports = {
    ExceptionTable,
    new_exception_table
}
