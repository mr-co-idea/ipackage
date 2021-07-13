#!/usr/bin/env node
const chalk = require('chalk');
const { getParams } = require('./src/utils');

const args = process.argv.splice(2);
const { app, template } = getParams(args);
process.env.APP = app || 'app';
process.env.TEMPLATE = template || 'react';

const { initialProject, initIndex, initMain, initConfig, initSrc, } = require('./src');

const main = async () => {
    const begin = Date.now();
    console.info(chalk.greenBright('项目开始创建，请耐心等待⌛️'));

    await initialProject();
    await initIndex();
    await initMain();
    await initConfig();
    await initSrc();

    const end = Date.now();

    console.info(chalk.greenBright('项目创建成功 😊'));
    console.info(chalk.grey('耗时：'), new Date(end - begin).getSeconds(), 's');
    console.info(chalk.grey(`cd ${process.env.APP} && npm install`));
    console.info(chalk.grey(`npm run dev || npm run build`));
}

main();