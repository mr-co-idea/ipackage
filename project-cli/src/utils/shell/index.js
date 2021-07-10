const { exec } = require('child_process'),
    chalk = require('chalk'),
    path = require('path');

/**
 * 执行shell命令
 * @param { string } cmd shell命令
 * @param { string } cwd 命令运行的环境，默认为脚本运行目录
 * @returns 
 */
const runShell = (cmd = '', cwd = path.resolve('.')) => new Promise((resolve, reject) => {
    const ls = exec(cmd, { cwd });

    const id = Math.random();

    ls.stdout.on('data', data => console.info(chalk.green(`stdout-${id}: `), data));
    ls.stdin.on('data', data => console.info(chalk.green(`stdin-${id}: `), data));

    ls.on('error', err => {
        console.info(chalk.red(`err-${id}: `), err);
        reject(err);
    });

    ls.on('close', code => {
        console.info(chalk.red(`exist-${id}: `), code);
        resolve(code);
    });
})

module.exports = {
    runShell,
}