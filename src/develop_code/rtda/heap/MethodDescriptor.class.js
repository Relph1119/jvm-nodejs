/**
 * @author: HuRuiFeng
 * @file: MethodDescriptor.class.js
 * @time: 2019/10/19 10:34
 * @desc: 方法描述符
 */

class MethodDescriptor {
    constructor() {
        this.parameter_types = [];
        this.return_type = "";
    }

    add_parameter_type(t) {
        this.parameter_types.push(t);
    }

}

exports.MethodDescriptor = MethodDescriptor;