/**
 * @author: HuRuiFeng
 * @file: WildcardEntry.class.js
 * @time: 2019/10/14
 * @desc: 通配符实例类（继承CompositeEntry类）
 */

let CompositeEntry = require('./CompositeEntry.class');
let path = require('path');
let ZipEntry = require('./ZipEntry.class');
let fs = require('fs');

class WildcardEntry extends CompositeEntry {
    constructor(path_parameter) {
        super(path_parameter);
        // 移除路径末尾的'*'符号
        let base_dir = path_parameter.substr(0, path_parameter.length - 1);
        readDirSync(base_dir, this.compositeEntryList);
        // walker.on('file', function (roots, stat, next) {
        //     if (stat.name.endsWith('.jar') || stat.name.endsWith('.JAR')) {
        //         console.log(stat.name);
        //         let jar_entry = new ZipEntry(path.join(roots, stat.name));
        //         this.compositeEntryList.append(jar_entry);
        //     }
        //     next();
        // });

    }



}

function readDirSync(root_path, compositeEntryList) {
    let pa = fs.readdirSync(root_path);
    pa.forEach((ele) => {
        let info = fs.statSync(root_path + "/" + ele);
        if (info.isDirectory()) {
            readDirSync(root_path + "/" + ele, compositeEntryList);
        } else {
            if (ele.endsWith('.jar') || ele.endsWith('.JAR')) {
                let jar_entry = new ZipEntry(path.join(root_path, ele));
                compositeEntryList[compositeEntryList.length] = jar_entry;
            }
        }
    })
}


module.exports = WildcardEntry;