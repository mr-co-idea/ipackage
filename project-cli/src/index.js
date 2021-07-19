const { initialCompile, copy, clear } = require('./utils');
const { merge } = require('@ipackage/merge')
const path = require('path');
const { writeFileSync, readFileSync, mkdirSync, existsSync, read } = require('fs');
const chalk = require('chalk');
const readline = require('readline');
const { dependencies, devDependencies } = require('./packages');
const { generateConfig } = require('./config');

initialCompile(String);

const $temp = process.env.TEMPLATE.replace(/_.+$/, '');
const $app = process.env.APP;

const {
    index: __index,
    config: __config,
    dependencies: __dependencies,
    devDependencies: __devDependencies,
} = require(`./template/${$temp}`)

/**
 * 项目初始化
 */
const initialProject = async () => {
    try {
        let projectPath = path.resolve($app);

        if (existsSync(projectPath)) {
            const ls = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            const aws = await new Promise((resolve, reject) => ls.question(`${chalk.green('是否删除此文件？')} ${chalk.red('Y')} or N\n`, resolve));

            if (aws.toUpperCase() === 'Y') {
                clear(path.resolve($app));

            } else {
                console.info(chalk.gray('创建项目已取消 ❎'))
                process.exit(0);
            }
            ls.close();

            // throw new Error('当前目录下存在同名文件，请更改后再重试');
        }

        mkdirSync(projectPath);

        const package = {
            name: $app,
            version: '0.0.1',
            description: '',
            main: 'index.js',
            scripts: {
                build: `webpack --env NODE_ENV=production --config ./config`,
                dev: `webpack serve --env NODE_ENV=development --config ./config`,
            },
            dependencies: merge(dependencies, __dependencies),
            devDependencies: merge(devDependencies, __devDependencies),
        }

        const __path = path.resolve($app, 'package.json');

        writeFileSync(__path, JSON.stringify(package, null, 4));
        console.log(chalk.green('1. 项目初始化成功 ✅'))
    } catch (err) {
        console.log(chalk.red('项目初始化异常：'), chalk.yellow(err), ' ❗️');
        process.exit(0);
    }
}

/**
 * 初始化主文件
 */
const initIndex = async () => {
    const index = __index || `document.getElementById('root').innerHTML = '<h1>app</h1>'`;
    try {
        writeFileSync(path.resolve($app, 'index.js'), index, { encoding: 'utf-8' });
        console.log(chalk.green('2. 生成主文件成功 ✅'))
    } catch (err) {
        console.log(chalk.red('生成主文件异常：'), chalk.yellow(err), ' ❗️');
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

        mkdirSync(path.resolve($app, './public'));
        writeFileSync(path.resolve($app, './public/index.html'), data, { encoding: 'utf-8' });
        console.log(chalk.green('3. 生成公共文件成功 ✅'));
    } catch (err) {
        console.log(chalk.red('生成公共文件异常：'), chalk.yellow(err), ' ❗️');
        process.exit(0);
    }
}

/**
 * 初始化配置文件
 */
const initConfig = async () => {
    try {
        const config = generateConfig(__config);
        mkdirSync(path.resolve($app, './config'));

        writeFileSync(path.resolve($app, './config/index.js'), config.index, { encoding: 'utf-8' });
        ['base', 'dev', 'prod', 'loader'].forEach(item => {
            let data = 'module.exports = ';
            if (item === 'loader') {
                data += `mode => (${JSON.stringify(config[item], null, 4).compile()})`
            } else {
                data += JSON.stringify(config[item], null, 4).compile();
            }

            writeFileSync(path.resolve($app, `./config/webpack.${item}.js`), data, { encoding: 'utf-8' });
        })

        console.log(chalk.green('4. 生成配置文件成功 ✅'));
    } catch (err) {
        console.log(chalk.red('生成配置文件异常：'), chalk.yellow(err), ' ❗️');
        process.exit(0);
    }
}

/**
 * 初始化src文件
 */
const initSrc = async () => {
    try {
        copy(path.join(__dirname, 'template', $temp, 'src'), path.resolve($app, './src'));
        console.log(chalk.green('5. 生成src文件文件成功 ✅'));
    } catch (err) {
        console.log(chalk.red('src文件异常：'), chalk.yellow(err), ' ❗️');
        process.exit(0);
    }
}




module.exports = {
    initialProject,
    initIndex,
    initMain,
    initConfig,
    initSrc,
}