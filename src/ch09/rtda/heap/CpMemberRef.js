/**
 * @author: HuRuiFeng
 * @file: CpMemberRef.js
 * @time: 2019/10/18 16:16
 * @desc: 符号引用信息，用于存放字段和方法符号引用共有的信息
 */

const SymRef = require("./CpSymRef").SymRef;

class MemberRef extends SymRef {
    constructor() {
        super();
        this.name = "";
        this.descriptor = "";
    }

    /**
     * 从class文件内存储的字段或方法常量中提取数据
     * @param ref_info
     */
    copy_member_ref_info(ref_info) {
        this.class_name = ref_info.class_name();
        let result = ref_info.name_and_descriptor();
        this.name = result.name;
        this.descriptor = result.type;
    }

}

exports.MemberRef = MemberRef;
