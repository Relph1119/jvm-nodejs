/**
 * @author: HuRuiFeng
 * @file: CpInterfaceMethodRef.js
 * @time: 2019/10/18 16:41
 * @desc:
 */

const MemberRef = require("./CpMemberRef").MemberRef;

class InterfaceMethodRef extends MemberRef {
    constructor(constant_pool, ref_info) {
        super();
        this.method = null;
        this.cp = constant_pool;
        this.copy_member_ref_info(ref_info);
    }

}

exports.InterfaceMethodRef = InterfaceMethodRef;
