/**
 * @author: HuRuiFeng
 * @file: entry.js
 * @time: 2019/10/14
 * @desc: 类路径项（基类）
 */

class Entry {
    // 路径分隔符
    static path_list_separator = ';';

    // 寻找和加载class文件，接口方法
    read_class(class_name) {
    };

    // 根据参数常见不同类型的Entry实例
    static new_entry(path) {
        let CompositeEntry = require("./CompositeEntry").CompositeEntry;
        let WildcardEntry = require("./WildcardEntry").WildcardEntry;
        let ZipEntry = require("./ZipEntry").ZipEntry;
        let DirEntry = require("./DirEntry").DirEntry;

        if (path.includes(Entry.path_list_separator)) {
            return new CompositeEntry(path);
        } else if (path.endsWith('*')) {
            return new WildcardEntry(path);
        } else if (path.endsWith('.jar') || path.endsWith('.JAR') || path.endsWith(".zip") || path.endsWith(".ZIP")) {
            return new ZipEntry(path);
        } else {
            return new DirEntry(path);
        }
    }
}

exports.Entry = Entry;
