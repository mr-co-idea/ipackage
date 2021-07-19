module.exports = {
    module: {
        rules: [
            {
                test: 'jsx',
                options: [
                    'm2',
                ],
                [Symbol.for('key')]: 'jsx'
            }
        ]
    }
}