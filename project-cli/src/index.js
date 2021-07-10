const { runShell, pull, initialCompile } = require('./utils');
const path = require('path');
const { writeFileSync, readFileSync, mkdirSync } = require('fs');
const chalk = require('chalk');
const { generateDependence } = require('./packages');
const { generateConfig } = require('./config');

initialCompile(String);

const $temp = process.env.TEMPLATE || 'react';
const $app = process.env.APP || 'app';
const __import = pull(__dirname);

const {
    index: __index,
    config: __config,
    dependence: __dependence,
} = __import(`./template/${$temp}`)

/**
 * 项目初始化
 */
const initialProject = async () => {
    try {
        await runShell(`npm init -y`);

        const __path = path.resolve('./package.json');

        const val = readFileSync(__path, { encoding: 'utf-8' });
        const config = JSON.parse(val);

        config.scripts = {
            build: `webpack --env NODE_ENV=production --config ./config`,
            dev: `webpack serve --env NODE_ENV=development --config ./config`,
        }

        writeFileSync(__path, JSON.stringify(config, null, 4));
        console.log(chalk.green('1. 项目初始化成功'))
    } catch (err) {
        console.log(chalk.red('项目初始化异常：'), chalk.yellow(err));
        process.exit(0);
    }
}


/**
 * 安装依赖
 */
const initDependence = async () => {
    try {
        const dep = await generateDependence(__dependence);
        await runShell(dep);
        console.log(chalk.green('2. 依赖安装成功'))
    } catch (err) {
        console.log(chalk.red('依赖安装异常：'), chalk.yellow(err));
        process.exit(0);
    }
}

/**
 * 初始化主文件
 */
const initIndex = async () => {
    const index = __index || `document.getElementById('root').innerHTML = '<h1>app</h1>'`;
    try {
        writeFileSync(path.resolve('./index.js'), index, { encoding: 'utf-8' });
        console.log(chalk.green('3. 生成主文件成功'))
    } catch (err) {
        console.log(chalk.red('生成主文件异常：'), chalk.yellow(err));
        process.exit(0);
    }
}

/**
 * 初始化公共文件
 */
const initMain = async () => {
    try {
        const html = readFileSync(path.join(__dirname, './public/index.html'), { encoding: 'utf-8' });
        const data = html.compile($app);

        mkdirSync(path.resolve('./public'));
        writeFileSync(path.resolve('./public/index.html'), data, { encoding: 'utf-8' });
        console.log(chalk.green('4. 生成公共文件成功'));
    } catch (err) {
        console.log(chalk.red('生成公共文件异常：'), chalk.yellow(err));
        process.exit(0);
    }
}

/**
 * 初始化配置文件
 */
const initConfig = async () => {
    try {
        const config = generateConfig(__config);

        mkdirSync(path.resolve('./config'));

        writeFileSync(path.resolve('./config/index.js'), config.index, { encoding: 'utf-8' });
        ['base', 'dev', 'prod', 'loader'].forEach(item => {
            writeFileSync(path.resolve(`./config/webpack.${item}.js`), JSON.stringify(config[item]).compile(), { encoding: 'utf-8' });
        })

        console.log(chalk.green('5. 生成配置文件成功'));
    } catch (err) {
        console.log(chalk.red('生成配置文件异常：'), chalk.yellow(err));
        process.exit(0);
    }
}

/**
 * 初始化src文件 --- 待完成
 */
const initSrc = async () => {
    try {
        const html = readFileSync(path.join(__dirname, './public/index.html'), { encoding: 'utf-8' });
        const data = html.compile($app);

        mkdirSync(path.resolve('./public'));
        writeFileSync(path.resolve('./public/index.html'), data, { encoding: 'utf-8' });
        console.log(chalk.green('6. 生成src文件文件成功'));
    } catch (err) {
        console.log(chalk.red('src文件异常：'), chalk.yellow(err));
        process.exit(0);
    }
}




module.exports = {
    initialProject,
    initDependence,
    initIndex,
    initMain,
    initConfig,
}