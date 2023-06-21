/**
 * @author: HuRuiFeng
 * @file: ClassInitLogic.js
 * @time: 2019/10/19 10:55
 * @desc: 类的初始化
 */

/**
 * 查找并调用类的初始化方法
 * @param thread
 * @param clazz
 */
function init_class(thread, clazz) {
    // 把类的init_started状态设置成true
    clazz.start_init();
    schedule_clinit(thread, clazz);
    init_super_class(thread, clazz);
}

/**
 * 准备执行类的初始化方法
 * @param thread
 * @param clazz
 */
function schedule_clinit(thread, clazz) {
    let clinit = clazz.get_clinit_method();
    let new_frame;
    if (clinit) {
        new_frame = thread.new_frame(clinit);
        thread.push_frame(new_frame);
    }
}

/**
 * 超类的初始化方法
 * @param thread
 * @param clazz
 */
function init_super_class(thread, clazz) {
    if (!clazz.is_interface()) {
        let super_class = clazz.super_class;
        if (super_class && !super_class.init_started) {
            init_class(thread, super_class);
        }
    }
}

module.exports = {
    init_class: init_class,
    schedule_clinit: schedule_clinit,
    init_super_class: init_super_class
};

