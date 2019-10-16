/**
 * @author: HuRuiFeng
 * @file: Classpath.class.js
 * @time: 2019/10/14
 * @desc: 类路径执行类
 */

let path = require('path');
let fs = require('fs');
let Entry = require('./Entry.class');
let WildcardEntry = require('./WildcardEntry.class');

class Classpath {
    constructor() {
        // 启动类路径
        this.boot_classpath = null;
        // 扩展类路径
        this.ext_classPath = null;
        // 用户类路径
        this.user_classpath = null;
    }

    // 解析类路径方法
    static parse(jreOption, cpOption) {
        let cp = new Classpath();
        // -Xjre选项解析启动类路径和扩展类路径
        cp.parse_boot_and_ext_classpath(jreOption);
        // -classpath/-cp选项解析用户类路径
        cp.parse_user_classpath(cpOption);
        return cp
    }

    parse_boot_and_ext_classpath(jreOption) {
        let jre_dir = Classpath.get_jre_dir(jreOption);

        let jre_lib_path = path.join(jre_dir, "lib", "*");
        this.boot_classpath = new WildcardEntry(jre_lib_path);

        let jre_ext_path = path.join(jre_dir, "lib", "ext", "*");
        this.ext_classPath = new WildcardEntry(jre_ext_path)
    }

    // 得到JRE路径
    static get_jre_dir(jreOption) {
        if (jreOption != null && Classpath.exists(jreOption)) {
            return jreOption;
        }
        if (Classpath.exists('./jre')) {
            return './jre';
        }
        let jh = process.env.JAVA_HOME;
        if (jh != null) {
            return path.join(jh, 'jre');
        }
        throw new Error("Can not find jre folder!");
    }

    // 判断路径是否存在
    static exists(path_parameter) {
        let stat = fs.lstatSync(path_parameter);
        return stat.isDirectory()
    }

    parse_user_classpath(self, cpOption) {
        if (cpOption == null) {
            cpOption = "."
        }
        this.user_classpath = Entry.new_entry(cpOption)
    }

    read_class(class_name) {
        let result;
        class_name = class_name + ".class";
        if (this.boot_classpath != null) {
            result = this.boot_classpath.read_class(class_name);
            return {data: result.data, entry: result.entry, error: result.error};
        }
        if (this.ext_classPath != null) {
            result = this.ext_classPath.read_class(class_name);
            return {data: result.data, entry: result.entry, error: result.error};
        }
        return this.user_classpath.read_class(class_name)
    }

    toString(){
        return this.user_classpath.toString();
    }

}

module.exports = Classpath;