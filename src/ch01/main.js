#!/usr/bin/env node

/**
 * @author: HuRuiFeng
 * @file: main.js
 * @time: 2023-06-19 23:01:56
 * @desc: 主函数
 */
const program = require('commander');

const Cmd = require("./Cmd").Cmd;

function main(input_args) {
    process.argv = input_args;

    program
        .version('0.0.1', '-V, --version', 'display current version')
        .usage('[options] class [args...]')
        .option('-c, --classpath [value]', 'Class Path')
        .parse(process.argv);

    if (program.getOptionValue('classpath')) {
        let cmd = new Cmd(program);
        start_JVM(cmd);
    }
}

function start_JVM(cmd) {
    cmd.print_classpath();
}

// let fake_args = ['node', 'main.js', '-h'];
// let fake_args = ['node', 'main.js', '-V'];
let fake_args = ['node', 'main.js', '--classpath', 'foo/bar', 'MyApp', 'arg1', 'arg2'];
main(fake_args);
