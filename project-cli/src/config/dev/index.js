module.exports = {
    devServer: {
        contentBase: './public',
        open: true,
        port: '${process.env.PORT}' || 8080,
        host: 'localhost',
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'localhost:3000',
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}