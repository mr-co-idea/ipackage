module.exports = {
    config: {
        loader: {
            module: {
                rules: [
                    {
                        options: {
                            plugins: [
                                ["import", {libraryName: 'antd',style: true,}],
                            ]
                        },
                        [Symbol.for('key')]: '.jsx'
                    },
                ]
            }
        }
    },
    dependencies: {
        "antd": "^4.16.7",
    },
    devDependencies: {
        "babel-plugin-import": "^1.13.3",
    }
}