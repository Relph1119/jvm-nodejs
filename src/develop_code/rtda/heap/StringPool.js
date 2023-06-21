/**
 * @author: HuRuiFeng
 * @file: StringPool.js
 * @time: 2019/10/19 21:50
 * @desc: 字符串池
 */

const ObjectClass = require("./Object").ObjectClass;
// 字符串池
let interned_strings = new Map();

/**
 * 根据nodejs字符串返回相应的Java字符串实例
 * @param loader
 * @param nodejs_str
 */
function j_string(loader, nodejs_str) {
    // 如果Java字符串已经在池中，直接返回
    let interned_str = interned_strings.get(nodejs_str);
    if (interned_str) {
        return interned_str;
    }

    // 把nodejs字符串（utf-8格式）转成Java字符数组（utf-16格式）
    let chars = string_to_utf16(nodejs_str);
    // 创建一个Java字符串实例
    let j_chars = new ObjectClass(loader.load_class("[C"), chars);

    // 把字符串实例的value变量设置成刚刚转换过来的字符数组
    let j_str = loader.load_class("java/lang/String").new_object();
    j_str.set_ref_var("value", "[C", j_chars);

    // 把Java字符串放入池中
    interned_strings.set(nodejs_str, j_str);
    return j_str
}


function string_to_utf16(s) {
    return Buffer.from(s).toString("utf8");
}

// 得到nodejs字符串
function nodejs_string(j_str) {
    // 拿到String对象的value变量值
    let char_array = j_str.get_ref_var("value", "[C");
    // 把字符数组转换成nodejs字符串
    return utf16_to_string(char_array.chars())
}

function utf16_to_string(s) {
    return Buffer.from(s, 'utf8').toString();
}

/**
 * 如果字符串还没有入池，把它放入并返回该字符串，否则找到已入池字符串并返回。
 * @param j_str
 */
function intern_string(j_str) {
    let nodejs_str = nodejs_string(j_str);
    let interned = interned_strings.get(nodejs_str);
    if (interned != null) {
        return interned
    }
    interned_strings.set(nodejs_str, j_str);
    return j_str;
}


module.exports = {
    j_string: j_string,
    nodejs_string: nodejs_string,
    intern_string: intern_string
};
