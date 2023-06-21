/**
 * @author: HuRuiFeng
 * @file: ZipEntry.js
 * @time: 2019/10/14
 * @desc: Zip或JAR文件形式的类路径（继承Entry类）
 */

let Entry = require("./entry").Entry;

class ZipEntry extends Entry {
    constructor(path_parameter) {
        super();
        this.absPath = path_parameter;
    }

    // Zip或JAR文件形式的类路径（继承Entry类）
    read_class(class_name) {
        let error, data = null;
        let AdmZip = require('adm-zip');
        let zip = new AdmZip(this.absPath, null);
        let zipEntries = zip.getEntries();
        for (const zipEntry of zipEntries) {
            if (zipEntry.isDirectory === false) {
                if (zipEntry.entryName.toString() === class_name) {
                    try {
                        data = zip.readFile(zipEntry);
                        break;
                    } catch (err) {
                        error = err;
                        return {error: error, entry: null, data: null}
                    }
                }
            }
        }
        if (data === null) {
            let format = require('string-format');
            format.extend(String.prototype);
            error = 'class not found:{0}'.format(class_name);
            return {error: error, entry: null, data: null};
        }
        return {error: error, entry: this, data: data};
    }

    toString() {
        return this.absPath;
    }
}

exports.ZipEntry = ZipEntry;
