#!/usr/bin/env node

/**
 * @author: HuRuiFeng
 * @file: main.js
 * @time: 2019/10/10
 * @desc: 主函数
 */
const program = require('commander');
const Cmd = require("./Cmd").Cmd;
const Frame = require("./rtda/Frame").Frame;

function main(input_args) {

    if (input_args) {
        process.argv = input_args;
        program
            .version('0.0.1', '-V, --version', 'display current version')
            .usage('[options] class [args...]')
            .option('-cp, --classpath [value]', 'Class Path')
            .option('-j, --Xjre [value]', 'path to jre')
            .parse(process.argv);

        let cmd = new Cmd(program);
    }

    start_JVM();
}

// 测试局部变量表
function test_local_vars(local_vars) {
    local_vars.set_int(0, 100);
    local_vars.set_int(1, -100);
    local_vars.set_long(2, 2997924580);
    local_vars.set_long(4, -2997924580);
    local_vars.set_float(6, 3.1415926);
    local_vars.set_double(7, 2.71828182845);
    local_vars.set_ref(9, null);
    console.log(local_vars.get_int(0));
    console.log(local_vars.get_int(1));
    console.log(local_vars.get_long(2));
    console.log(local_vars.get_long(4));
    console.log(local_vars.get_float(6));
    console.log(local_vars.get_double(7));
    console.log(local_vars.get_ref(9));
}

function test_operand_stack(ops) {
    ops.push_int(100);
    ops.push_int(-100);
    ops.push_long(2997924580);
    ops.push_long(-2997924580);
    ops.push_float(3.1415926);
    ops.push_double(2.71828182845);
    ops.push_ref(null);
    console.log(ops.pop_ref());
    console.log(ops.pop_double());
    console.log(ops.pop_float());
    console.log(ops.pop_long());
    console.log(ops.pop_long());
    console.log(ops.pop_int());
    console.log(ops.pop_int());
}

// 启动JVM函数
function start_JVM() {
    let frame = new Frame(100, 100);
    test_local_vars(frame.local_vars);
    test_operand_stack(frame.operand_stack);
}

main();
