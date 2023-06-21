/**
 * @author: HuRuiFeng
 * @file: CompositeEntry.js
 * @time: 2019/10/14
 * @desc: 由更小的Entry组成（继承Entry类）
 */

let Entry = require("./entry").Entry;
let format = require('string-format');
format.extend(String.prototype);

class CompositeEntry extends Entry {
    constructor(path_list) {
        super();
        this.compositeEntryList = [];

        if (path_list.includes(Entry.path_list_separator)) {
            // 把参数（路径列表）按分隔符分成小路径，然后把每个小路径都转换成具体的Entry实例
            path_list.toString().split(Entry.path_list_separator).forEach((path) => {
                let entry = Entry.new_entry(path);
                this.compositeEntryList.push(entry);
            })
        }
    }

    // 依次调用每一个子路径的read_class()方法
    read_class(class_name) {
        for (const entry of this.compositeEntryList) {
            let result = entry.read_class(class_name);
            if (result.error == null) {
                return {data: result.data, entry: result.entry, error: null}
            }
        }
        return {data: null, entry: null, error: "class not found:{0}".format(class_name)}
    }

    toString() {
        return this.compositeEntryList.map((entry) => entry.toString()).join(Entry.path_list_separator);
    }

}

exports.CompositeEntry = CompositeEntry;
