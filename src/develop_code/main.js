#!/usr/bin/env node

/**
 * @author: HuRuiFeng
 * @file: main.js
 * @time: 2019/10/10
 * @desc: 主函数
 */
let program = require('commander');
const format = require('string-format');
format.extend(String.prototype);
const Cmd = require("./Cmd.class").Cmd;
const path = require('path');
const ClassLoader = require("./rtda/heap/ClassLoader.class").ClassLoader;
let Classpath = require("./classpath/Classpath.class").Classpath;
const Interpreter = require("./Interpreter.class").Interpreter;


function main(input_args) {
    if (input_args) {
        process.argv = input_args;
        program
            .version('0.0.1')
            .usage('[options] class [args...]')
            .option('-c, --classpath [value]', 'Class Path')
            .option('-j, --Xjre [value]', 'path to jre')
            .option('-b, --verbose [value]', 'enable verbose output')
            .parse(process.argv);

        let cmd = new Cmd(program);
        start_JVM(cmd);
    }
}

// 启动JVM函数
function start_JVM(cmd) {
    // 解析类路径
    let class_path = Classpath.parse(cmd.XjreOption, cmd.cpOption);
    // 打印命令行参数
    console.log('classpath: %s class: %s args: %s\n', class_path.toString(), cmd.class_name, cmd.args);

    let class_loader = new ClassLoader(class_path, cmd.verbose_class_flag);

    let class_name = cmd.class_name.replace(/\./g, "/");
    let main_class = class_loader.load_class(class_name);
    let main_method = main_class.get_main_method();

    if (main_method) {
        // 调用interpret()函数解释执行main()方法
        Interpreter.interpret(main_method, cmd.verbose_inst_flag, cmd.args);
    } else {
        console.log("Main method not found in class {0}".format(cmd.class_name));
    }

}

let Xjre_path = path.join(process.env.JAVA_HOME, 'jre');
// 得到项目路径的绝对地址
let root_path = path.join(__dirname, '../../');
// 得到java的用户类路径
let resources_path = path.join(root_path, 'java/class');

// 1. 执行GetClassTest程序
// let fake_args = ['node', 'main.js', '--Xjre', Xjre_path, '--verbose', 'inst', '--classpath', resources_path, 'jvmgo.book.ch09.GetClassTest'];
let fake_args = ['node', 'main.js', '--Xjre', Xjre_path, '--classpath', resources_path, 'jvmgo.book.ch09.GetClassTest'];

main(fake_args);
