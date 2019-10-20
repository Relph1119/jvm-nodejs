/**
 * @author: HuRuiFeng
 * @file: MethodDescriptorParser.class.js
 * @time: 2019/10/19 10:35
 * @desc: 方法描述符解析器
 */

const MethodDescriptor = require("./MethodDescriptor.class").MethodDescriptor;
let format = require('string-format');
format.extend(String.prototype);

class MethodDescriptorParser {
    constructor() {
        this.raw = "";
        this.offset = 0;
        this.parsed = null;
    }

    static parse_method_descriptor(descriptor) {
        let parser = new MethodDescriptorParser();
        return parser.parse(descriptor);
    }

    parse(descriptor) {
        this.raw = descriptor;
        this.parsed = new MethodDescriptor();
        this.start_params();
        this.parse_param_types();
        this.end_params();
        this.parse_return_type();
        this.finish();
        return this.parsed;
    }

    start_params() {
        if (this.read_uint8() !== '(') {
            this.cause_panic()
        }
    }

    end_params() {
        if (this.read_uint8() !== ')') {
            this.cause_panic()
        }
    }

    finish() {
        if (this.offset !== this.raw.length) {
            this.cause_panic()
        }
    }

    cause_panic() {
        throw new Error("BAD descriptor: {0}".format(this.raw))
    }

    read_uint8() {
        let b = this.raw[this.offset];
        this.offset++;
        return b
    }

    unread_uint8() {
        this.offset--;
    }

    parse_param_types() {
        while (true) {
            let t = this.parse_field_type();
            if (t !== "") {
                this.parsed.add_parameter_type(t)
            } else {
                break
            }
        }
    }

    parse_return_type() {
        if (this.read_uint8() === 'V') {
            this.parsed.return_type = "V";
            return;
        }

        this.unread_uint8();
        let t = this.parse_field_type();
        if (t !== "") {
            this.parsed.return_type = t;
            return
        }
        this.cause_panic()
    }

    parse_field_type() {
        let field_type = this.read_uint8();
        switch (field_type) {
            case 'B':
                return 'B';
            case 'C':
                return 'C';
            case'D':
                return 'D';
            case'F':
                return 'F';
            case'I':
                return 'I';
            case'J':
                return 'J';
            case'S':
                return 'S';
            case'Z':
                return 'Z';
            case'L':
                return this.parse_object_type();
            case'[':
                return this.parse_array_type();
            default:
                this.unread_uint8();
                return ""
        }
    }

    parse_object_type() {
        let unread = this.raw.slice(this.offset);
        let semicolon_index = unread.indexOf(";");
        if (semicolon_index === -1) {
            this.cause_panic();
            return "";
        } else {
            let obj_start = this.offset - 1;
            let obj_end = this.offset + semicolon_index + 1;
            this.offset = obj_end;
            return this.raw.slice(obj_start, obj_end);
        }
    }

    parse_array_type() {
        let arr_start = this.offset - 1;
        this.parse_field_type();
        let arr_end = this.offset;
        return this.raw.slice(arr_start, arr_end)
    }

}

exports.MethodDescriptorParser = MethodDescriptorParser;


