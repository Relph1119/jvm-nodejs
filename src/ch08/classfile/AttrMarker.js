/**
 * @author: HuRuiFeng
 * @file: AttrMarker.js
 * @time: 2019/10/16
 * @desc: 起标记作用的属性
 */

const AttributeInfo = require("./AttributeInfo").AttributeInfo;

class MarkerAttribute extends AttributeInfo {
    read_info(class_reader) {
    }
}

// Deprecate属性用于指出类、接口、字段或方法已经不建议使用，编译器等工具可以根据Deprecated属性输出警告信息。
class DeprecatedAttribute extends MarkerAttribute {

}

// Synthetic属性用来标记源文件中不存在、由编译器生成的类成员，引入该属性主要是为了支持嵌套类和嵌套接口。
class SyntheticAttribute extends MarkerAttribute {

}

module.exports = {
    DeprecatedAttribute: DeprecatedAttribute,
    SyntheticAttribute: SyntheticAttribute
};
