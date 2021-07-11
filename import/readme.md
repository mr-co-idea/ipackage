# 模块化引入（node环境下）

* 运行时引入
* ```
    const __import = require('@ipackage/import')(__dirname);
    __import(file); // file相对路径等同于require时候的路径
    ```