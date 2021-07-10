module.exports = {
    module: {
        rules: [
            {
                test: "${/\.jsx?$/}",
                loader: 'babel-loader',
                exclude: "${/node_modules/}",
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react',
                    ]
                }
            },
            {
                test: "${/\.html$/}",
                loader: 'html-loader',
            },
            {
                test: "${/\.css$/}",
                use: [
                    "${mode === 'production' ? require('mini-css-extract-plugin').loader : 'style-loader'}",
                    "css-loader",
                ]
            },
            {
                test: "${/\.less$/}",
                use: [
                    "${mode === 'production' ? require('mini-css-extract-plugin').loader : 'style-loader'}",
                    "css-loader",
                    "less-loader"
                ]
            },
        ]
    }
}