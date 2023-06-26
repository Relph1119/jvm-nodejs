/**
 * @author: HuRuiFeng
 * @file: Cmd.js
 * @time: 2019/10/12
 * @desc: 命令行类
 */

class Cmd {
    constructor(program) {
        // 指定用户类路径
        this.cpOption = program.getOptionValue('classpath');
        // 类名
        this.class_name = program.args[0];
        // 传入的其他参数，或者是类参数
        this.args = program.args.slice(1);
        // 版本号
        this.version = program.version();
        // 指定jre目录
        this.XjreOption = program.getOptionValue('Xjre');
    }

    // 打印类信息
    print_classpath() {
        console.log('classpath:%s class:%s args:%s', this.cpOption, this.class_name, this.args)
    }

    // 打印传入参数
    print_args() {
        return '[' + this.args.join(' ') + ']';
    }
}

exports.Cmd = Cmd;
