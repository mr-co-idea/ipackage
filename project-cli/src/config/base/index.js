module.exports = {
    entry: './index.js',
    resolve: {
        alias: {
            '@src': './src',
        },
        extensions: ['.js', '.less', '.css'],
    },
    plugins: [
        "${new require('html-webpack-plugin')({ fileName: 'index.html', template: './public/index.html' })}",
    ]
}