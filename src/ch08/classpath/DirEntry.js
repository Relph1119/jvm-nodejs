/**
 * @author: HuRuiFeng
 * @file: DirEntry.js
 * @time: 2019/10/14
 * @desc: 目录形式的类路径（继承Entry类）
 */

let Entry = require("./Entry").Entry;
let path = require('path');
let fs = require('fs');

class DirEntry extends Entry {
    constructor(path_parameter) {
        super();
        // 将参数转换成绝对路径
        this.absDir = path_parameter;
    }

    read_class(class_name) {
        let file_name = path.join(this.absDir, class_name);
        let data, error = null;
        data = fs.readFileSync(file_name, function (err) {
            if (err) {
                error = err;
            }
        });
        return {error: error, entry: this, data: data};
    }

    toString() {
        return this.absDir;
    }
}

exports.DirEntry = DirEntry;
