/**
 * @author: HuRuiFeng
 * @file: bufferUtil.js
 * @time: 2019/10/16
 * @desc:
 */

// Buffer转ArrayBuffer
function toArrayBuffer(buf) {
    let ab = new ArrayBuffer(buf.length);
    let view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}

module.exports = {
    toArrayBuffer: toArrayBuffer
};