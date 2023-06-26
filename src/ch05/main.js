#!/usr/bin/env node

/**
 * @author: HuRuiFeng
 * @file: main.js
 * @time: 2019/10/10
 * @desc: 主函数
 */
const program = require('commander');
const format = require('string-format');
format.extend(String.prototype);
const Cmd = require("./Cmd").Cmd;
const ClassFile = require("./classfile/ClassFile").ClassFile;
const path = require('path');
const Classpath = require("./classpath/Classpath").Classpath;
const Interpreter = require("./Interpreter").Interpreter;


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
        start_JVM(cmd);
    }
}

// 启动JVM函数
function start_JVM(cmd) {
    // 解析类路径
    let class_path = Classpath.parse(cmd.XjreOption, cmd.cpOption);
    // 打印命令行参数
    console.log('classpath: %s class: %s args: %s', class_path.toString(), cmd.class_name, cmd.args);

    // 读取主类数据
    let class_name = cmd.class_name.replace(/\./g, "/");
    // 读取并解析class文件
    let class_file = load_class(class_name, class_path);
    // 查找类的main()方法
    let main_method = get_main_method(class_file);
    if (main_method) {
        // 调用interpret()函数解释执行main()方法
        Interpreter.interpret(main_method);
    } else {
        console.log("Main method not found in class {0}".format(cmd.class_name));
    }

}

// 加载class
function load_class(class_name, class_path) {
    let result = class_path.read_class(class_name);
    let class_file = new ClassFile();
    return class_file.parse(result.data);
}

// 查找类的main()方法
function get_main_method(class_file) {
    for (let m of class_file.methods) {
        if (m.name() === "main" && m.descriptor() === "([Ljava/lang/String;)V") {
            return m;
        }
    }
    return null;
}

let Xjre_path = path.join(process.env.JAVA_HOME, 'jre');
// 得到项目路径的绝对地址
let root_path = path.join(__dirname, '../../');
// 得到java的用户类路径
let resources_path = path.join(root_path, 'java/class');

let fake_args = ['node', 'main.js', '--Xjre', Xjre_path, '--classpath', resources_path, 'jvmgo.book.ch05.GaussTest'];
main(fake_args);
