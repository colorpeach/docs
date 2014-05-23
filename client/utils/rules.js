var rules = {
    abstract:"",
    //需要被继承者实现或重写

    access : "",
    //指定对该成员的访问级别——私用，公共，受保护

    alias : "",
    //成员的别名

    augments : "",
    //将对象扩展到父级对象上

    author : "",
    //定义一个项目的坐着

    borrows : "",
   //一个方法引用另一个方法的文档

    callback : "",
   //回调函数的文档

    classdesc : "",
   //描述整个类

    constant : "",
   //常量文档

    constructor : "",
   //构造函数

    constructs : "",
   //定义对象字面量构造实例

    copyright : "",
   //版权信息

    default : "",
   //定义默认值

    deprecated : "",
   //定义废弃的方法

    desc : "",
   //描述一个方法，可以插入html或markdown

    enum : " [<type>]",
   //描述值的类型相同的静态属性集合

    event :" <className>#[event:]<eventName>",
   //描述事件

    example :" <caption>",
   //描述一个项目的示例，其后可以跟<caption>定义标题

    exports : "",
   //定义模块暴露的成员

    external : " <NameOfExternal>",
   //定义项目的外部类，命名空间或模块

    file : "",
   //描述文件，在文件顶部

    fires : " <className>#[event:]<eventName>",
   //描述事件可以触发的事件

    global : "",
   //描述全局对象

    ignore : "",
   //从最终输出里移除

    inner : "",
   //描述一个内部

    instance : "",
   //一个实例成员，能通过Class#member引用

    kind : "",
   /**设置类型
    class
    constant
    event
    external
    file
    function
    member
    mixin
    module
    namespace
    typedef
    */
    lends : "",
   //将对象字面量所有的属性生成文档

    license : "",
   //声明

    link : "",
   /**产生链接
    {@link someSymbol}
    {@link http://some.url.com}
    [caption here]{@link someSymbol}
    [caption here]{@link http://some.url.com}
    {@link someSymbol|caption here}
    {@link http://some.url.com|caption here}
    {@link http://some.url.com Caption Here (after the first space)}
    {@link someSymbol Caption Here (after the first space)}
    */

    member : " [<type>] [<name>]",
   //定义类成员

    memberof : " <parentNamepath>",
    "memberof!" : " <parentNamepath>",
   //定义父类的成员

    method : " [<FunctionName>]",
    func : " [<FunctionName>]",
    function : " [<FunctionName>]//等同于@name [<FunctionName>]",
   //描述一个方法或函数

    mixes : " <OtherObjectPath>",
   //描述当前对象混入了另一个对象的所有方法

    mixin : " [<MixinName>]",
   //定义一个混入类，用来给其他对象附加方法

    module : " [[{<type>}] <ModuleName>]",
   //定义模块名字

    name : " <namePath>",
   //定义方法或对象名字

    namespace : " [[{<type>}] <SomeName>]",
   //命名空间

    param : "",
   //定义函数的参数

    private : "",
   //私有方法

    protected : "",
   //受保护的方法

    public : "",
   //公共方法

    property : "",
   //定义类，命名空间或对象的静态属性列表

    readonly : "",
   //只读的

    requires : " <someModuleName>",
   //依赖的模块

    returns : "",
   //函数返回值

    see : [" <namepath>"," <text>"],
   //引用相关资源

    since : " versionDescription",
   //方法，属性等在指定版本开始支持

    static : "",
   //静态方法

    summary : " Summary goes here.",
   //概述

    this : " <namePath>",
   //描述此处this的指向

    throws : [" free-form description"," {<type>}"," {<type>} free-form description"],
   //描述可能抛出的错误

    todo : " text describing thing to do.",
   //待完成的部分

    tutorial : " <tutorialID>或者行内{@tutorial <tutorialID>}",
   //插入教程的链接

    type : "",
   //定义类型

    typedef : " [<type>] <namepath>",
   //定义自定义类型

    variation : " <variationNumber>",
   //区分同名的类和命名空间

    version : ""
   //描述版本
};