#!/usr/bin/env node

/**
 * @author: HuRuiFeng
 * @file: main.js
 * @time: 2019/10/10
 * @desc: 主函数
 */
const program = require('commander');
const Cmd = require("./Cmd").Cmd;
const Classpath = require("./classpath/Classpath").Classpath;
const path = require('path');

function main(input_args) {
    process.argv = input_args;
    program
        .version('0.0.1', '-V, --version', 'display current version')
        .usage('[options] class [args...]')
        .option('-cp, --classpath [value]', 'Class Path')
        .option('-j, --Xjre [value]', 'path to jre')
        .parse(process.argv);

    let cmd = new Cmd(program);
    start_JVM(cmd);
}

function start_JVM(cmd) {
    // 解析类路径
    let class_path = Classpath.parse(cmd.XjreOption, cmd.cpOption);
    // 打印命令行参数
    console.log('classpath: %s class: %s args: %s', class_path.toString(), cmd.class_name, cmd.args);

    // 读取主类数据
    let class_name = cmd.class_name.replace(/\./g, "/");
    let result = class_path.read_class(class_name);
    if (result.error != null) {
        console.log("Could not find or load main class %j\n", cmd.class_name);
        return;
    }

    // 打印class里面的数据信息
    console.log("class data: %j", [...result.data]);
}

let Xjre_path = path.join(process.env.JAVA_HOME, 'jre');
let fake_args = ['node', 'main.js', '--Xjre', Xjre_path, 'java.lang.Object'];
main(fake_args);
