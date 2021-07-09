const chokidar = require('chokidar'),
    path = require('path'),
    { exec } = require('child_process'),
    chalk = require('chalk');

function iwatch(cmd, options = {}) {
    const { listenDir = path.resolve('.'), cwd = path.resolve('.') } = options;

    const watcher = chokidar.watch(listenDir);

    console.info('监听脚本启动成功')

    let ls;
    watcher.on('change', () => {
        if (ls) ls.kill();
        ls = exec(cmd, { cwd });

        ls.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        ls.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        ls.on('close', (code) => {
            console.log(chalk.red(`child process exited with code ${chalk.green(code)}`));
        });
    })
}

module.exports = {
    iwatch,
}