module.exports = {
    output: {
        filename: 'js/[name].[hash:5].bindle.js',
        chunkFilename: 'js/[name].[hash:].bindle.js',
        path: "${require('path').resolve('./dist')}"
    },
    optimization:{
        splitChunks:{
            chunks: 'all',
            cacheGroups:{
                vendor:{
                    name: 'vendor',
                    test: "${/[\\/]node_modules[\\/]/}",
                    priority: -10,
                    chunks: 'initial',
                }
            }
        },
        usedExports:true,
    },
    plugins: [
        "${new require('clean-webpack-plugin')}",
        "${new require('mini-css-extract-plugin')({filename: 'css/[name].[hash:5].css'})}",
    ]
}