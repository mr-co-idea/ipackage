const { merge } = require('webpack-merge'),
    base = require('./base'),
    dev = require('./dev'),
    prod = require('./prod'),
    loader = require('./loader');

const index = `
const { merge } = require('webpack-merge');

const base = require('./webpack.base'),
    dev = require('./webpack.dev'),
    prod = require('./webpack.prod'),
    initModule = require('./webpack.loader');

module.exports = function (env, argv) {
    const mode = env.NODE_ENV;
    const config = mode === 'production' ? prod : dev;
    return merge(base, config, initModule(mode), { mode });
};
`

/**
 * 生成配置对象
 * @param {Object}} templateConfig 
 * @returns 
 */
const generateConfig = (templateConfig) => {
    const { index: __index, base: __base = {}, dev: __dev = {}, prod: __prod = {}, loader: __loader = {} } = templateConfig;


    return {
        index: __index || index,
        base: merge(base, __base),
        dev: merge(dev, __dev),
        prod: merge(prod, __prod),
        loader: merge(loader, __loader),
    }
}

module.exports = {
    index,
    base,
    dev,
    prod,
    loader,
    generateConfig,
}