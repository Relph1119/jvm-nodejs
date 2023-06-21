/**
 * @author: HuRuiFeng
 * @file: CpMethodRef.js
 * @time: 2019/10/18 16:39
 * @desc: 方法符号引用
 */

const MemberRef = require("./CpMemberRef").MemberRef;

class MethodRef extends MemberRef {
    constructor(constant_pool, ref_info) {
        super();
        this.method = null;
        this.cp = constant_pool;
        this.copy_member_ref_info(ref_info);
    }

}

exports.MethodRef = MethodRef;
