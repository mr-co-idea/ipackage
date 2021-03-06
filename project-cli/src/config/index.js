const base = require('./base'),
    dev = require('./dev'),
    prod = require('./prod'),
    loader = require('./loader');

const { deepMerge } = require('@ipackage/merge')

const merge = deepMerge(Symbol.for('key'));

const index = `
const { merge } = require('@ipackage/merge');

const base = require('./webpack.base'),
    initModule = require('./webpack.loader');

module.exports = function (env, argv) {
    const mode = env.NODE_ENV;
    const config = mode === 'production' ? require('./webpack.prod') : require('./webpack.dev');
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