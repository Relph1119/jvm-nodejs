/**
 * @author: HuRuiFeng
 * @file: BranchLogic.js
 * @time: 2019/10/17
 * @desc: 跳转逻辑
 */

function branch(frame, offset) {
    let pc = frame.thread.pc;
    frame.next_pc = pc + offset;
}

module.exports = {
    branch: branch
};