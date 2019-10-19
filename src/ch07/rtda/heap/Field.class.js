/**
 * @author: HuRuiFeng
 * @file: Field.class.js
 * @time: 2019/10/18 15:39
 * @desc:
 */

const AccessFlags = require("./AccessFlags");
const ClassMember = require("./ClassMember.class").ClassMember;

class Field extends ClassMember {
    constructor() {
        super();
        this.const_value_index = 0;
        this.slot_id = 0;
    }

    /**
     * 根据class文件的字段信息创建字段表
     * @param clazz
     * @param cfFields
     */
    static new_fields(clazz, cfFields) {
        let fields = [];
        for (let cfField of cfFields) {
            let field = new Field();
            field.set_class(clazz);
            field.copy_member_info(cfField);
            field.copy_attributes(cfField);
            fields.push(field);
        }
        return fields;
    }

    // 用于判断volatile访问标志是否被设置
    is_volatile() {
        return 0 !== (this.access_flags & AccessFlags.ACC_VOLATILE);
    }

    // 用于判断transient访问标志是否被设置
    is_transient() {
        return 0 !== (this.access_flags & AccessFlags.ACC_TRANSIENT);
    }

    // 用于判断enum访问标志是否被设置
    is_enum() {
        return 0 !== (this.access_flags & AccessFlags.ACC_ENUM)
    }

    // 从method_info结构中提取constant_value_index信息
    copy_attributes(cfField) {
        let val_attr = cfField.constant_value_attribute();
        if (val_attr) {
            this.const_value_index = val_attr.constant_value_index
        }
    }

}

exports.Field = Field;