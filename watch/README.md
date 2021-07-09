# 监听工具

## 简介
* 当监听目录中文件发生变化时，重新启动要执行的命令
* 当前一个命令的子进程仍未结束，后一个已经开始执行，则自动杀死前一个子进程

## 指引
* `npm install --save-dev @ipackage/iwatch`
* ```
    const { iwatch } = require('@ipackage/iwatch');

    iwatch(cmd,[options]);
    ```
* `cmd` 监听触发的指令
* `options = { listenDir, cwd}` 配置项：listenDir 监听的目录；cwd 执行命令的目录。默认为项目根目录