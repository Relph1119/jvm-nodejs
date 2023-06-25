# 记录自己用NodeJS完成编写JVM的过程

项目完全参考张秀宏的《自己动手写Java虚拟机》代码结构，原书使用Go语言实现，在此向本书作者表示感谢。

原书代码地址：https://github.com/zxh0/jvmgo-book

## 运行环境

NodeJS 版本：18.16.0
WebStorm 版本：WebStorm 2021.1
Java版本：1.8

## 代码结构
<pre>
images---------------------------------运行截图
java-----------------------------------java的代码与class文件
+----class-----------------------------java编译生成的class文件
+----code------------------------------java的测试代码
src------------------------------------jvm代码
+-----ch01-----------------------------对应书中第1章实现代码
+-----ch02-----------------------------对应书中第2章实现代码
+-----ch03-----------------------------对应书中第3章实现代码
+-----ch04-----------------------------对应书中第4章实现代码
+-----ch05-----------------------------对应书中第5章实现代码
+-----ch06-----------------------------对应书中第6章实现代码
+-----ch07-----------------------------对应书中第7章实现代码
+-----ch08-----------------------------对应书中第8章实现代码
+-----develop_code---------------------持续开发的实现代码（目前到第9章的9.7节-自动拆装箱）
      +-----classfile------------------class文件解析的对象类
      +-----classpath------------------类路径目录
      +-----instructions---------------指令集
      +-----native---------------------本地方法目录
      +-----rtda-----------------------运行时数据区
      +-----utils----------------------工具类
</pre>

## 代码编写与运行结果

项目的所有运行都是采用直接运行main.js的方式，请读者运行时注意。

### 第1章-命令行工具

完成一个简易的命令行工具，使用各种参数执行JVM命令  
传入参数：
> --cp foo/bar MyApp arg1 arg2

![](images/ch01/命令行工具.png)
1. 采用program对命令进行解析。
2. 由于该program不能对"-cp"命令进行解析，故改成"-c"。

### 第2章-搜索class文件

完成搜索class文件功能，类路径的查找，按照搜索的先后顺序，类路径可以从以下3个部分查找：启动类路径、扩展类路径、用户类路径。
传入参数：
> --Xjre "D:\JavaTools\jdk1.8.0_151\jre" java.lang.Object

![](images/ch02/搜索class文件.png)
1. 由于node.js的异步机制，在遍历文件夹目录的时候，采用递归的做法，没有用walk模块。
2. node.js和java很像，不能像python返回多个参数，笔者采用了返回map对象，代替多个返回值的实现。
3. 使用adm-zip包对ZIP文件进行解压。

### 第3章-解析class文件
完成解析class文件功能，将class文件加载之后，按照JVM规范，读取字节，存储class的版本号，类属性、方法、接口的对象。  
传入参数：  
> --Xjre "D:\JavaTools\jdk1.8.0_151\jre" java.lang.String

![](images/ch03/解析class文件.png)
1. 数组快速初始化：  
    ```
    Array(cp_count).fill(null).map(() => 0);
    ```
2.  将bytes数组转成long长整型，node.js中长整型是BigInt类型：
    ```
    const view = new DataView(bufferUtils.toArrayBuffer(byte_data));
    this.val = view.getBigInt64(0);
    ```

### 第4章-运行时数据区
&emsp;&emsp;实现运行时数据区（run-time data area），可分为两类：一类是多线程共享的，另一类是线程私有的。多线程共享的运行时数据区需要在Java虚拟机启动时创建好，在Java虚拟机退出时销毁。线程私有的运行时数据区则在创建线程时才创建，线程退出时销毁。  
&emsp;&emsp;多现场共享的内存区域主要存放两类数据：类数据和类实例（也就是对象）。对象数据存放在堆中，类数据存放在方法区中。线程私有的运行时数据区用于辅助执行Java字节码。  
![](images/ch04/运行时数据区.png)
1. 不能使用以下代码初始化对象数组，需要用for循环遍历初始化对象，因为会陷入死循环（栈溢出）。
    ```
    Array(cp_count).fill(null).map(() => new Object());
    ```
2. 为了使用String.format，导入string-format包，使用方法如下：  
    ```
    let format = require('string-format');
    format.extend(String.prototype);
    let a = "size:{0} slots:{1}".format(this.size, this.slots.toString());
    console.log(a)
    ```

### 第5章-指令集和解释器
&emsp;&emsp;在前两章的基础上编写了一个简单的解释器，并实现大约150条指令，可以执行100个整数求和的程序，能得到5050的正确答案。  
![](images/ch05/解析GaussTest的class文件.png)
1. 获得类名可以使用以下代码
    ```
    obj_instance.constructor.name
    ```
2. 读取文件示例代码
    ```
    data = fs.readFileSync(file_name, function (err, bytesData) {
        if (err) {
            error = err;
        }
    });
    ```

### 第6章-类和对象
&emsp;&emsp;实现线程共享的运行时数据区，包括方法区、运行时常量池、类和对象、一个简单的类加载器，以及ldc和部分引用类指令。  
![](images/ch06/类加载器的实现.png)

1. 运算优先级的问题
    ```
    0 != 9 & 0x0008
    ```
该代码在python、go语言下执行为true,但是在node.js中执行为0，因为在node.js中!=的优先级比&高。需要加括号，以调整运算优先级。

### 第7章-方法调用和返回
&emsp;&emsp;基本完成了方法调用和返回，并实现了类初始化逻辑，已经可以运行Fibonacci程序（求第30个Fibonacci数）。  
![](images/ch07/解析Fibonacci程序.png)
1. 该程序会执行很长的时间，但是最后会打印出832040结果。
2. 该程序可能会报“JavaScript heap out of memory”错误，可以在Node Parameters中添加“--max-old-space-size=8000”，表示内存地址8000MB大小。

### 第8章-数组和字符串
实现了数组和字符串的加载，终于可以运行HelloWorld程序了。
1. 解析并执行BubbleSortTest（冒泡排序）算法
![](images/ch08/解析并执行BubbleSortTest（冒泡排序）算法.png)
2. 解析并执行HelloWorld程序，打印出Hello world!
![](images/ch08/解析并执行HelloWorld程序.png)
3. 解析并执行PrintArgs程序，打印出传入的参数
![](images/ch08/解析并执行PrintArgs程序.png)

**本章总结：** 
1. 实现了对象深拷贝方法，在utils/objectUtil.js中的deepcopy方法
2. node.js的Map遍历的方法如下（其中PrimitiveTypes是Map类型）：
    ```
    for(let [class_name, d] of PrimitiveTypes) {
            if (d === descriptor) {
                return class_name;
            }
        }
    ```

### 第9章-本地方法调用
实现了本地方法调用的指令，以及Java类库中一些最基本的类和本地方法，有如下本地方法：java.lang.Object.getClass()、java.lang.Class.getPrimitiveClass()、java.lang.Class.getName0()、java.lang.Class.desiredAssertionStatues0、System.arrayCopy()、Float.floatToRawIntBits()、Double.doubleToRawLongBits()  
1. 执行GetClassTest程序，得到基本数据类型的类getName()结果。
![](images/ch09/执行GetClassTest程序.png)
2. 执行StringTest程序，得到字符串判断的结果
![](images/ch09/执行StringTest程序.png)
3. 执行ObjectTest程序，得到对象的hashCode值，生成hashCode的代码是直接利用内置函数hash()生成的
![](images/ch09/执行ObjectTest程序.png)
4. 执行CloneTest程序，可以观察到克隆的对象与原始对象的pi值不一样
![](images/ch09/执行CloneTest程序.png)

**本章总结：** 
1. 由于invokenative指令是动态执行本地方法，又因为本地方法在不同的模块里，因此自己实现了动态加载模块，并执行对应的函数方法。  
    ```
    for (let load_module of LOAD_MODULES){
        // 加载该模块，判断里面是否有native_method方法
        let md = require(load_module);
        if(Object.getOwnPropertyDescriptors(md).hasOwnProperty(native_method.name)) {
            let func = Object.getOwnPropertyDescriptors(md)[native_method.name].value;
            func.call(func, frame);
            return;
        }
    }
    ```
2. 在生成hash code时，采用fnv-plus包，具体代码如下：
    ```
    const fnv = require('fnv-plus');
    let hash_value = fnv.hash(this_ref.toString(), 32).dec();
    ```
3. 在处理float和double的时候，采用struct-python包，该包是struct的js实现：
    ```
    const struct = require('python-struct');
    struct.unpack('>q', struct.pack('>d', val))[0];
    ```
4. 在加载java/util/Hashtable类时，由于解析Class文件，初始化ConstantPool的时候，node.js赋值float型的数据不能保留原始数据类型，导致程序运行失败，具体错误如下：  
    ```
    LocalVars: slots:[ num:0 ref:[object Object], num:0 ref:[object Object], num:0 ref:null, num:0 ref:null ]
    OperandStack: size:1 slots:[ num:0 ref:[object Object], num:1 ref:[object Object] ]
    RangeError [ERR_OUT_OF_RANGE]: The value of "value" is out of range. It must be >= -2147483648 and <= 2147483647. Received 2147483648
        at checkInt (internal/buffer.js:58:11)
        at writeU_Int32BE (internal/buffer.js:788:3)
        at Buffer.writeInt32BE (internal/buffer.js:876:10)
        at PACK_INT32_BE (D:\MyJSWork\JVMByNodeJS\node_modules\python-struct\src\core.js:90:51)
        at Function.pack (D:\MyJSWork\JVMByNodeJS\node_modules\python-struct\src\core.js:602:25)
        at LocalVars.get_float (D:\MyJSWork\JVMByNodeJS\src\develop_code\rtda\LocalVars.js:41:43)
        at _fload (D:\MyJSWork\JVMByNodeJS\src\develop_code\instructions\loads\Fload.js:12:32)
        at FLOAD_1.execute (D:\MyJSWork\JVMByNodeJS\src\develop_code\instructions\loads\Fload.js:30:9)
        at Function.loop (D:\MyJSWork\JVMByNodeJS\src\develop_code\Interpreter.js:53:18)
        at Function.interpret (D:\MyJSWork\JVMByNodeJS\src\develop_code\Interpreter.js:27:25)
    ```
    value的值是2147483648，原本该值应该通过local_vars.get_float()转化为float的类型，值为2147483648.0，由于解析Class文件的时候，在ConstantFloatInfo类调用read_info()函数，初始化val的时候，丢失了原始数据类型。
    
## 总结
&emsp;&emsp;历时8天完成1-9章的代码，基本实现了一个JVM的功能，能提供如下命令：
> -v, --version : 版本号  
--verbose class : 打印类加载信息    
--verbose inst : 打印指令  
--classpath : 用户类路径  
--Xjre : jre的路径  

&emsp;&emsp;其中遇到的问题都写在前面了，目前完成的功能有基本的命令行、class文件搜索和解析、运行时数据区、指令集和解释器、类和对象、方法调用和返回（支持迭代和递归）、数组和字符串类的加载、调用本地方法。    
&emsp;&emsp;由于运行第9章的BoxTest程序（打印数组元素）报错，导致不能再继续用Node.js实现JVM，后期可能会自定义Float类型，以区别Number类型中的int类型。
