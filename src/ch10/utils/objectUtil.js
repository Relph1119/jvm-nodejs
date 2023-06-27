/**
 * @author: HuRuiFeng
 * @file: objectUtil.js
 * @time: 2019/10/19 21:20
 * @desc: 对象工具类
 */

/**
 * 对象深拷贝
 * @param out
 * @return {*}
 */
function deepcopy(out) {
    if (!out) {
        console.error('where is your container ?')
    }
    let objs = [].slice.call(arguments, 1);
    if (objs.length > 0) {
        objs.forEach(function (item, index) {
            if (typeof item !== 'object') {
                console.error('item' + index + ' is no valid arguments, expected to be object')
            } else {
                for (let key in item) {
                    if (item.hasOwnProperty(key)) {
                        if (typeof item[key] === 'object') {
                            out[key] = out[key] || {};  // 这步是最重要的！
                            deepcopy(out[key], item[key])
                        } else {
                            out[key] = item[key]
                        }
                    }
                }
            }
        })
    }
    return out;
}

module.exports = {
    deepcopy: deepcopy
};