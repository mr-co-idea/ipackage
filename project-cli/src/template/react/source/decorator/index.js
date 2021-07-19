module.exports = {
    config: {
        loader: {
            module: {
                rules: [
                    {
                        options: {
                            plugins: [
                                ["@babel/plugin-proposal-decorators", { legacy: true }]
                            ]
                        },
                        [Symbol.for('key')]: '.jsx'
                    },
                ]
            }
        }
    },
    devDependencies: {
        "@babel/plugin-proposal-decorators": "^7.14.5",
    }
}