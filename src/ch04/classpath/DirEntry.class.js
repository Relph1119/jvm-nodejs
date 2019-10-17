/**
 * @author: HuRuiFeng
 * @file: DirEntry.class.js
 * @time: 2019/10/14
 * @desc:
 */

let Entry = require('./Entry.class');
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
        let data = null, error = null;
        fs.readFile(file_name, function (err, bytesData) {
            if (err) {
                error = err;
            }
            data = bytesData;
        });
        return {error: error, entry: this, data: data};
    }

    toString() {
        return this.absDir;
    }
}

module.exports = DirEntry;
