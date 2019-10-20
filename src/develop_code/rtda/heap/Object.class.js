/**
 * @author: HuRuiFeng
 * @file: Object.class.js
 * @time: 2019/10/17
 * @desc: 表示对象
 */

const copy_slot = require("../../instructions/stack/Dup.class").copy_slot;
const Slots = require("../Slot.class").Slots;

class ObjectClass {
    constructor(clazz, data = null, extra = null) {
        // 存放对象的class
        this._class = clazz;
        // 存放实例变量
        if (!data) {
            this.data = []
        } else {
            this.data = data;
        }
        // 用来记录Object结构体实例的额外信息
        if (!extra) {
            this.extra = []
        } else {
            this.extra = extra;
        }
    }

    static new_object(clazz) {
        return new ObjectClass(clazz, new Slots(clazz.instance_slot_count));
    }

    get_class() {
        return this._class;
    }

    is_instance_of(clazz) {
        return clazz.is_assignable_from(this._class);
    }

    fields() {
        return this.data;
    }

    bytes() {
        return this.data;
    }

    shorts() {
        return this.data;
    }

    ints() {
        return this.data;
    }

    longs() {
        return this.data;
    }

    chars() {
        return this.data;
    }

    floats() {
        return this.data;
    }

    doubles() {
        return this.data;
    }

    // 引用类型数组
    refs() {
        return this.data;
    }

    /**
     * 数组长度
     * 上述方法主要是供<t>aload、<t>astore和arraylength指令使用；
     * <t>aload和<t>astore系列指令各有8条，针对每种类型都提供一个方法，返回相应的数组数据（由于python的数组中可以存放各种类型，故不区分数组类型）
     * arraylength指令只有一条，只需要一个方法。
     * @return {number}
     */
    array_length() {
        return this.data.length;
    }

    /**
     * 直接给对象的引用类型实例变量赋值
     * @param name
     * @param descriptor
     * @param ref
     */
    set_ref_var(name, descriptor, ref) {
        let field = this._class.get_field(name, descriptor, false);
        let slots = this.data;
        slots.set_ref(field.slot_id, ref);
    }

    get_ref_var(name, descriptor) {
        let field = this._class.get_field(name, descriptor, false);
        let slots = this.data;
        return slots.get_ref(field.slot_id);
    }

    /**
     * 数组拷贝
     */
    static array_copy(src, dest, src_pos, dest_pos, length){
        if(src.data.constructor === Array){
            dest.data.splice.apply(dest.data, [dest_pos, length].concat(src.data.slice(src_pos, src_pos + length)));
        } else if(src.data.constructor === String) {
            let src_data_arr = src.data.split('').map((c) => c.charCodeAt());
            dest.data.splice.apply(dest.data, [dest_pos, length].concat(src_data_arr.slice(src_pos, src_pos + length)));
        }
        else {
            throw new Error("Not array!");
        }
    }

    clone() {
        return new ObjectClass(this._class, this.clone_data());
    }

    clone_data() {
        if(this.data.constructor !== Slots){
            return this.data.slice()
        } else {
            let new_data = new Slots(this.data.length);
            for(let i = 0; i < this.data.length; i++) {
                let slot = this.data[i];
                new_data[i] = copy_slot(slot);
            }
            return new_data;
        }

    }

}

exports.ObjectClass = ObjectClass;