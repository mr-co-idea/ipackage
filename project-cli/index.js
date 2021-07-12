#!/usr/bin/env node
const chalk = require('chalk');
const { initialProject, initDependence, initIndex, initMain, initConfig, initSrc, } = require('./src')

const [template = 'react'] = process.argv.splice(2);
process.env.TEMPLATE = template;

const main = async () => {
    const begin = Date.now();
    console.info(chalk.greenBright('项目开始创建，请耐心等待⌛️'));

    await initialProject();
    await initDependence();
    await initIndex();
    await initMain();
    await initConfig();
    await initSrc();

    const end = Date.now();

    console.info(chalk.greenBright('项目创建成功 😊'));
    console.info(chalk.grey('耗时：'), new Date(end - begin).getSeconds(), 's');
    console.info(chalk.grey('npm install && npm run dev tostart'))
}

main();