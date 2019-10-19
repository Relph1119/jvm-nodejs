/**
 * @author: HuRuiFeng
 * @file: CpSymRef.class.js
 * @time: 2019/10/18 16:07
 * @desc: 符号引用基类
 */

class SymRef {
    constructor() {
        // 用于存放符号引用所在的运行时常量池
        this.cp = null;
        // 类的完全限定名
        this.class_name = "";
        // 缓存解析后的类
        this._class = null
    }

    get_class() {
        return this._class;
    }

    // 解析类
    resolved_class() {
        if (this.get_class() === null) {
            this.resolve_class_ref();
        }
        return this.get_class()
    }

    /**
     * 类符号引用解析
     * 如果类D通过符号引用N应用类C的话，要解析N，先用D的类加载器加载C，然后检查D是否有权限访问C，
     * 如果没有，则抛出IllegalAccessError异常。
     */
    resolve_class_ref() {
        let d = this.cp.get_class();
        let c = d.loader.load_class(this.class_name);
        if (!c.is_accessible_to(d)) {
            throw new Error("java.lang.IllegalAccessError")
        }
        this._class = c
    }
}

exports.SymRef = SymRef;