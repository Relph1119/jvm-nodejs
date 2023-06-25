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
const ClassFile = require("./classfile/ClassFile").ClassFile;

function main(input_args) {
    process.argv = input_args;
    program
        .version('0.0.1')
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

    // 读取主类数据
    let class_name = cmd.class_name.replace(/\./g, "/");

    let class_file = load_class(class_name, class_path);

    console.log(cmd.class_name);
    print_class_info(class_file);
}

// 加载class
function load_class(class_name, class_path) {
    let result = class_path.read_class(class_name);
    let class_file = new ClassFile();
    return class_file.parse(result.data);
}

function print_class_info(class_file) {
    console.log("version: %i.%i", class_file.major_version, class_file.minor_version);
    console.log("constants count: %s", class_file.constant_pool.cp.length);
    console.log("access flags: 0x%s", class_file.access_flags.toString(16));
    console.log("this class: %s", class_file.class_name());
    console.log("super class: %s", class_file.super_class_name());
    console.log("interfaces: %s", class_file.interface_names());
    console.log("fields count: %i", class_file.fields.length);
    for (let field of class_file.fields) {
        console.log("   %s", field.name());
    }
    console.log("methods count: %i", class_file.methods.length);
    for (let method of class_file.methods) {
        console.log("   %s", method.name());
    }
}

let Xjre_path = path.join(process.env.JAVA_HOME, 'jre');
let fake_args = ['node', 'main.js', '--Xjre', Xjre_path, 'java.lang.String'];
main(fake_args);
