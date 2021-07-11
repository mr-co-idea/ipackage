#!/usr/bin/env node
const chalk = require('chalk');
const { initialProject, initDependence, initIndex, initMain, initConfig, } = require('./src')

const [template = 'react'] = process.argv.splice(2);
process.env.TEMPLATE = template;

const main = async () => {
    await initialProject();
    await initDependence();
    await initIndex();
    await initMain();
    await initConfig();

    console.info(chalk.greenBright('项目初始化成功😊'))
}

main();