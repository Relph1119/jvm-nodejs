#!/usr/bin/env node

/**
 * @author: HuRuiFeng
 * @file: main.js
 * @time: 2019/10/10
 * @desc: 主函数
 */
let program = require('commander');
let Cmd = require("./Cmd.class").Cmd;
let Frame = require("./rtda/Frame.class").Frame;

function main(input_args) {

    if (input_args) {
        process.argv = input_args;
        program
            .version('0.0.1')
            .usage('[options] class [args...]')
            .option('-c, --classpath [value]', 'Class Path')
            .option('-j, --Xjre [value]', 'path to jre')
            .parse(process.argv);

        let cmd = new Cmd(program);
    }

    start_JVM();
}

// 测试局部变量表
function test_local_vars(local_vars) {
    local_vars.set_numeric(0, 100);
    local_vars.set_numeric(1, -100);
    local_vars.set_numeric(2, 2997924580);
    local_vars.set_numeric(3, -2997924580);
    local_vars.set_numeric(4, 3.1415926);
    local_vars.set_numeric(5, 2.71828182845);
    local_vars.set_ref(6, null);
    console.log(local_vars.get_numeric(0));
    console.log(local_vars.get_numeric(1));
    console.log(local_vars.get_numeric(2));
    console.log(local_vars.get_numeric(3));
    console.log(local_vars.get_numeric(4));
    console.log(local_vars.get_numeric(5));
    console.log(local_vars.get_ref(6));
}

function test_operand_stack(ops) {
    ops.push_numeric(100);
    ops.push_numeric(-100);
    ops.push_numeric(2997924580);
    ops.push_numeric(-2997924580);
    ops.push_numeric(3.1415926);
    ops.push_numeric(2.71828182845);
    ops.push_ref(null);
    console.log(ops.pop_ref());
    console.log(ops.pop_numeric());
    console.log(ops.pop_numeric());
    console.log(ops.pop_numeric());
    console.log(ops.pop_numeric());
    console.log(ops.pop_numeric());
    console.log(ops.pop_numeric());
}

// 启动JVM函数
function start_JVM() {
    let frame = new Frame(100, 100);
    test_local_vars(frame.local_vars);
    test_operand_stack(frame.operand_stack);
}

main();
